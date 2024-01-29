import DiscordJS, {Client, GatewayIntentBits} from 'discord.js';
import {
    joinVoiceChannel,
    createAudioPlayer,
    NoSubscriberBehavior,
    createAudioResource,
    AudioPlayerStatus
} from "@discordjs/voice";
import dotenv from 'dotenv'
dotenv.config()

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildVoiceStates
    ],
});


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

const player = createAudioPlayer({
    behaviors: {
        noSubscriber: NoSubscriberBehavior.Pause,
    },
});

client.on('interactionCreate', async (interaction) => {
    const { commandName } = interaction;
    if (interaction.isCommand() || interaction.customId === 'edgehog') {
        if (!interaction.member.voice.channel) {
            return interaction.reply({
                content: 'You need to enter a voice channel before listening to Edgehog Radio',
                ephemeral: true
            });
        }

        try {
            const connection = joinVoiceChannel({
                channelId: interaction.member.voice.channelId,
                guildId: interaction.guildId,
                adapterCreator: interaction.guild.voiceAdapterCreator,
                selfDeaf: false
            })

            const player = createAudioPlayer();
            connection.subscribe(player)

            console.log(process.env.EDGEHOG_RADIO_URL)
            const resource = createAudioResource(process.env.EDGEHOG_RADIO_URL)
            player.play(resource)
            player.on(AudioPlayerStatus.Idle, () => {
                connection.destroy()
            });
        } catch (e) {
            console.error(e)
        }

        return interaction.reply({
            content: 'Playing EHU Radio',
            ephemeral: true
        });
    }
});

client.login(process.env.DISCORD_BOT_TOKEN)