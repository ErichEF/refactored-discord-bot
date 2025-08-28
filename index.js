const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, GatewayIntentBits, Routes, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { token } = require('./config.json');
///const { openai_key } = require('./config.json');
const { OpenAI } = require('openai')



const client = new Client({ intents: [GatewayIntentBits.Guilds,'GuildMessages','MessageContent'] });

client.commands = new Collection();
client.cooldowns = new Collection();
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);


for (const folder of commandFolders) {
    const commandsPath = path.join(foldersPath, folder);
    
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

const GITROLES = {
  MAPS: '1', // maps
  UNREAL: '2', // weekly unreal
  EXTREME: '3', // EX Farm or new EX
  SHOWS: '4', // Shows/Movies
  OTHERGAMES: '5', // Non FF party/coop games
  FFXIV: '6',
  FFXIV2: '7', // bungle ffxiv
  LETHALCOMPANY: '8', // lethal company
  PROJECTZOMBOID: '9', // project zomboid
  BATTLEBIT: '10', // battlebit
  DEEPROCKGALACTIC: '11', // deep rock galactic
  MONHUN: '12', //monsterhunter
  VERMINTIDEDARKTIDE: '13', // vermintide or darktide
  HELLDIVERS: '14', // helldivers
  BAROTRAUMA: '15', // barotrauma
  MOVIE: '16', // Shows/Movies
  STARWARS: '17', // star wars games
  HALO: '18', // halo
  DOTA: '19', // bungle dota
  FORTNITE: '20', // fortnite
  GTFO: '21', // gtfo game
};


client.on('interactionCreate', async (interaction) => {
    if (interaction.isButton()) {
      const role = interaction.guild.roles.cache.get(
        SALTROLES[interaction.customId.toUpperCase()] // the button's custom Id MUST match your ROLES property defined above
      );
  
      if (!role)
        return interaction.reply({ content: 'Role not found', ephemeral: true });
  
      const hasRole = interaction.member.roles.cache.has(role.id);
      console.log(hasRole,interaction.member.user,interaction.member.id);
  
      if (hasRole)
        return interaction.member.roles
          .remove(role)
          .then((member) =>
            interaction.reply({
              content: `The ${role} role was removed from you ${interaction.member} ʕʘ_ʘʔ`,
              ephemeral: true,
            })
          )
          .catch((err) => {
            console.log(err);
            return interaction.reply({
              content: `Something went wrong. The ${role} role was not removed to you ${interaction.member}`,
              ephemeral: true,
            });
          });
      else
        return interaction.member.roles
          .add(role)
          .then((member) =>
            interaction.reply({
              content: `The ${role} role was added to you ${interaction.member} ʕʘ‿ʘʔ`,
              ephemeral: true,
            })
          )
          .catch((err) => {
            console.log(err);
            return interaction.reply({
              content: `Something went wrong. The ${role} role was not added to you ${interaction.member}`,
              ephemeral: true,
            });
          });
    }
  });
  
// openai integration done with help of https://www.youtube.com/watch?v=EUlnKW6Yy94 and OpenAI documentation

const IGNORE_PREFIX = "!";
const AI_CHANNELS = ['ai-channel-number'];
const apimodel = {model:'gpt-4.1'};

const openai = new OpenAI({
  apiKey: 'OPENAI API KEY',
});

// New command to handle image generation
client.on('messageCreate', async (message) => {
  if (message.author.bot) return;
  if (!message.content.startsWith("!generate")) return; // Listen for '!generate' prefix

  const prompt = message.content.slice(10).trim(); // Get the prompt after '!generate'

  if (!prompt) {
    return message.reply("Please provide a description for the image you'd like to generate.");
  }

  await message.channel.sendTyping();

  const sendTypingInterval = setInterval(()=>{
    message.channel.sendTyping();    
  }, 5000);

  try {
    // Generate the image using OpenAI's DALL·E model
    const imageResponse = await openai.images.generate({
      model: "dall-e-3",
      prompt: prompt,
      n: 1, // Generate a single image
      size: '1024x1024', // You can change the size (256x256, 512x512, or 1024x1024)
    });


    clearInterval(sendTypingInterval);
    // Send the image to Discord
    const imageUrl = imageResponse.data[0].url;
    message.reply({ content: `Here is the image you requested: ${imageUrl}` });
  } catch (error) {
    clearInterval(sendTypingInterval);
    console.error('Image generation error:', error);
    message.reply("Sorry, there was an error generating the image.");
  }
});


client.on('messageCreate', async (message) => {
  console.log(message.author.display_name);
  console.log(message.author.id);
  console.log(message.content);

  if (message.author.bot) return;
  if (message.content.startsWith("!generate")) return;
  if (!AI_CHANNELS.includes(message.channelId) && !message.mentions.users.has(client.user.id)) return;

  await message.channel.sendTyping();

  const sendTypingInterval = setInterval(()=>{
    message.channel.sendTyping();    
  }, 5000);

  let conversation = [];

  conversation.push({
    role: 'system',
    content: `This is where the prompt that describes the bot's personality goes, alongside other quirky things you'd like it to do.
    `
  });

  let prevMessages = await message.channel.messages.fetch({ limit: 20});

  prevMessages.reverse();


  prevMessages.forEach((msg) => {
    if (msg.author.bot && msg.author.id !== client.user.id) return;
    if (msg.content.startsWith(IGNORE_PREFIX)) return;

    const username = msg.author.username.replace(/\s+/g,'_').replace(/[^\w\s]/gi,'');

    if (msg.attachments.size > 0){
      const imageAttachment = msg.attachments.first();
      const imageUrl = imageAttachment.url; // Keep the entire URL including query parameters
      apimodel.model = 'gpt-4.1'

      if (msg.author.id === client.user.id) {
        conversation.push({
          role: 'assistant',
          name: username,
          content: [{ type: "text", text: msg.content }, { type: "image_url", image_url: imageAttachment }]
        });
  
        return;
      }
  
      conversation.push({
        role: 'user',
        name: username,
        content: [{ type: "text", text: msg.content }, { type: "image_url", image_url: imageAttachment }],
      });

    } else{
      apimodel.model = 'gpt-4.1'
        
        if (msg.author.id === client.user.id) {
          conversation.push({
            role: 'assistant',
            name: username,
            content: msg.content
          });
    
          return;
        }
    
        conversation.push({
          role: 'user',
          name: username,
          content: msg.content,
        });

    }
    
    ;

  });
  
  console.log(apimodel.model);
  const response = await openai.chat.completions.create({
    model: apimodel.model,
    messages: conversation,
    "max_tokens": 500
  }).catch((error) => console.error ('OpenAI Error:\n',error));

  clearInterval(sendTypingInterval);

  if (!response) {
    message.reply("Sowee, I lost my hat and can't think right now!");
    return;
  }

  // const responseMessage = response.choices[0].message.content
  // const chunkSizeLimit = 2000;

  // for (let i = 0; i < responseMessage.length; i += chunkSizeLimit) {
  //   const chunk = responseMessage.substring(i, i + chunkSizeLimit);

  //   await message.reply(chunk)

  // }

  console.log(response.choices)
  
  const responseMessage = response.choices[0].message.content
  const chunkSizeLimit = 2000;

  for (let i = 0; i < responseMessage.length; i += chunkSizeLimit) {
    const chunk = responseMessage.substring(i, i + chunkSizeLimit);

    await message.reply(chunk)

  }

});


client.login(token);
