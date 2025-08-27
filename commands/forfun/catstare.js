const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('catstare')
		.setDescription('Deploy catstare.'),
	async execute(interaction) {
		// interaction.user is the object representing the User who ran the command
		// interaction.member is the GuildMember object, which represents the user in the specific guild
		await interaction.reply(`Command acknowledged, ${interaction.user}. Deploying tactical Cat Stare.`);
		await interaction.channel.send(`https://cdn.discordapp.com/attachments/910750999319310376/911055269465821235/kT0yjyC.png?ex=65f39ad6&is=65e125d6&hm=7a62aff019d8772528b500df170d2ecfcd01776c816d9a7baa75da98442e4d64&`);
	},
};
