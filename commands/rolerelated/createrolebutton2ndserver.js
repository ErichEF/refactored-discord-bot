const { SlashCommandBuilder } = require('discord.js');
const { Client, Collection, GatewayIntentBits, Routes, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;


module.exports = {

  cooldown: 300,

	data: new SlashCommandBuilder()
		.setName('otherroles')
    .setDescription('Creates the role buttons.'),
    
  
	async execute(interaction) {
        const channel = interaction.channel;
        console.log(channel,interaction.member.user,interaction.member.id);

        await interaction.deferReply();


        channel.send({
          content: 'Select your role by clicking on a button',
          components: [
            new ActionRowBuilder().setComponents(
              new ButtonBuilder()
                .setCustomId('ffxiv')
                .setLabel('Final Fantasy XIV')
                .setEmoji({ name: '🚢' })
                .setStyle(ButtonStyle.Secondary),
                new ButtonBuilder()
                .setCustomId('lethalcompany')
                .setLabel('Lethal Company')
                .setEmoji({ name: '🧑🏿‍🚀' })
                .setStyle(ButtonStyle.Secondary),
              new ButtonBuilder()
                .setCustomId('projectzomboid')
                .setLabel('Project Zomboid')
                .setEmoji('🧟‍♀️')
                .setStyle(ButtonStyle.Secondary),
            ),
          ],
        });

        channel.send({
          components: [
            new ActionRowBuilder().setComponents(
              new ButtonBuilder()
                .setCustomId('battlebit')
                .setLabel('Battlebit')
                .setEmoji({ name: '🔫' })
                .setStyle(ButtonStyle.Secondary),
              new ButtonBuilder()
                .setCustomId('deeprockgalactic')
                .setLabel('Deep Rock Galactic')
                .setEmoji({ name: '⛏️' })
                .setStyle(ButtonStyle.Secondary),
              new ButtonBuilder()
                .setCustomId('monhun')
                .setLabel('Monster Hunter')
                .setEmoji('🦖')
                .setStyle(ButtonStyle.Secondary),
            ),
          ],
        });

        channel.send({
          components: [
            new ActionRowBuilder().setComponents(
              new ButtonBuilder()
                .setCustomId('vermintidedarktide')
                .setLabel('Vermintide/Darktide')
                .setEmoji({ name: '💩' })
                .setStyle(ButtonStyle.Secondary),
              new ButtonBuilder()
                .setCustomId('helldivers')
                .setLabel('Helldivers')
                .setEmoji({ name: '🇺🇸' })
                .setStyle(ButtonStyle.Secondary),
                new ButtonBuilder()
                .setCustomId('barotrauma')
                .setLabel('Barotrauma')
                .setEmoji({ name: '🤿' })
                .setStyle(ButtonStyle.Secondary),
            ),
          ],
        });

        channel.send({
          components: [
            new ActionRowBuilder().setComponents(
              new ButtonBuilder()
                .setCustomId('movie')
                .setLabel('Movie')
                .setEmoji({ name: '🎞️' })
                .setStyle(ButtonStyle.Secondary),
              new ButtonBuilder()
                .setCustomId('starwars')
                .setLabel('Star Wars Stuff')
                .setEmoji({ name: '👽' })
                .setStyle(ButtonStyle.Secondary),
                new ButtonBuilder()
                .setCustomId('halo')
                .setLabel('Halo MCC/Infinite')
                .setEmoji({ name: '👩‍🍳' })
                .setStyle(ButtonStyle.Secondary),
            ),
          ],
        });

        channel.send({
          components: [
            new ActionRowBuilder().setComponents(
              new ButtonBuilder()
                .setCustomId('dota')
                .setLabel('Dota')
                .setEmoji({ name: '🇺🇦' })
                .setStyle(ButtonStyle.Secondary),
              new ButtonBuilder()
                .setCustomId('fortnite')
                .setLabel('Fortnite')
                .setEmoji({ name: '🚌' })
                .setStyle(ButtonStyle.Secondary),
                new ButtonBuilder()
                .setCustomId('gtfo')
                .setLabel('GTFO (the game)')
                .setEmoji({ name: '🇲🇽' })
                .setStyle(ButtonStyle.Secondary),
            ),
          ],
        });
        
        //await interaction.reply(`This command was run by ${interaction.user}.`);

        await wait (5000);
        await interaction.followUp(`This command was run by ${interaction.user}.`);
        
	},
};