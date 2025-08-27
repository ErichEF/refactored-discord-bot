const { SlashCommandBuilder } = require('discord.js');
const { Client, Collection, GatewayIntentBits, Routes, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;


module.exports = {

  cooldown: 300,

	data: new SlashCommandBuilder()
		.setName('exampleroles')
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
                .setEmoji({ name: '🌑' })
                .setStyle(ButtonStyle.Success),
            ),
          ],
        });

        channel.send({
          components: [
            new ActionRowBuilder().setComponents(
              new ButtonBuilder()
                .setCustomId('maps')
                .setLabel('Maps')
                .setEmoji({ name: '🗺️' })
                .setStyle(ButtonStyle.Primary),
              new ButtonBuilder()
                .setCustomId('stuff')
                .setLabel('Weekly stuff')
                .setEmoji({ name: '🦀' })
                .setStyle(ButtonStyle.Secondary),
              new ButtonBuilder()
                .setCustomId('extreme stuff')
                .setLabel('Extreme stuff')
                .setEmoji('<:dog>')
                .setStyle(ButtonStyle.Danger),
            ),
          ],
        });

        channel.send({
          components: [
            new ActionRowBuilder().setComponents(
              new ButtonBuilder()
                .setCustomId('shows')
                .setLabel('Shows/Movies')
                .setEmoji({ name: '🎞️' })
                .setStyle(ButtonStyle.Primary),
              new ButtonBuilder()
                .setCustomId('othergames')
                .setLabel('Party/coop Games')
                .setEmoji({ name: '🎮' })
                .setStyle(ButtonStyle.Success)
            ),
          ],
        });
        
        //await interaction.reply(`This command was run by ${interaction.user}.`);

        await wait (5000);
        await interaction.followUp(`This command was run by ${interaction.user}.`);
        
	},
};