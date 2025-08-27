const { Events } = require('discord.js');
const { Client, Collection, GatewayIntentBits, Routes, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
        console.log(`Ready! Logged in as ${client.user.tag}`);
    // Uncomment this to get the message sent to your channel
    // const channel = client.channels.cache.get('856414031198814241');
    // console.log(channel);
    // channel.send({
    //   content: 'Select your role by clicking on a button',
    //   components: [
    //     new ActionRowBuilder().setComponents(
    //       new ButtonBuilder()
    //         .setCustomId('blue')
    //         .setLabel('Blue')
    //         .setStyle(ButtonStyle.Primary),
    //       new ButtonBuilder()
    //         .setCustomId('red')
    //         .setLabel('Red')
    //         .setStyle(ButtonStyle.Primary),
    //       new ButtonBuilder()
    //         .setCustomId('green')
    //         .setLabel('Green')
    //         .setStyle(ButtonStyle.Primary),
    //       new ButtonBuilder()
    //         .setCustomId('pink')
    //         .setLabel('Pink')
    //         .setStyle(ButtonStyle.Primary),
    //       new ButtonBuilder()
    //         .setCustomId('purple')
    //         .setLabel('Purple')
    //         .setStyle(ButtonStyle.Primary)
    //     ),
    //   ],
    // });
	},
};
