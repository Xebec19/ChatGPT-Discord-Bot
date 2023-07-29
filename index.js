import { Client, GatewayIntentBits } from "discord.js";
import promptHandler from "./command.handler.js";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.on("messageCreate", promptHandler);

client.login(process.env.DISCORD_BOT_KEY);
console.log("ChatGPT is online on discord");
