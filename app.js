import DiscordJS, {Intents, MessageActionRow, MessageButton, MessageEmbed, MessageSelectMenu} from 'discord.js'
import dotenv from 'dotenv'
dotenv.config()

const client = new DiscordJS.Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
})



client.on('ready', () => {
    console.log('Attempting to reach Edgehog Radio')
    fetch(process.env.EDGEHOG_RADIO_URL)
        .then(response => {
        if (response.ok) {
            console.log('Successfully reached Edgehog Radio');
        } else {
            console.log(`Error loading stream: ${response.status}`);
        }
        })
        .catch(error => {
            console.error('Error loading stream:', error);
        });
    console.log('This bot is a member of the following servers:')
    const Guilds = client.guilds.cache.map(guild => "Guild ID: " + guild.id + ". Guild name: " + guild.name);
    console.log(Guilds);
})

client.login(process.env.TOKEN)