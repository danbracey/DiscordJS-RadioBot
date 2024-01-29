const {SlashCommandBuilder} = require("discord.js");
module.exports = {
    data: new SlashCommandBuilder()
        .setName('edgehog')
        .setDescription('Listen to Edgehog Radio in the Voice Channel you are currently in'),
    async execute(interaction) {
        //
    },
};