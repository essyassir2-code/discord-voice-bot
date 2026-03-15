const { Client, GatewayIntentBits } = require("discord.js");
const { joinVoiceChannel } = require("@discordjs/voice");

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates]
});

const VOICE_CHANNEL_ID = "1482794282501931192"; // حط ID ديال الصوت هنا

function connectToVoice() {
  const channel = client.channels.cache.get(VOICE_CHANNEL_ID);

  if (!channel) return console.log("Voice channel not found");

  joinVoiceChannel({
    channelId: channel.id,
    guildId: channel.guild.id,
    adapterCreator: channel.guild.voiceAdapterCreator
  });

  console.log("Joined voice channel");
}

client.once("ready", () => {
  console.log("Bot online!");
  connectToVoice();
});

client.on("voiceStateUpdate", () => {
  const channel = client.channels.cache.get(VOICE_CHANNEL_ID);
  if (!channel) return;

  const bot = channel.guild.members.me;

  if (!bot.voice.channel) {
    console.log("Reconnecting to voice...");
    connectToVoice();
  }
});

client.login(process.env.TOKEN);
