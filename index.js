import { Client, GatewayIntentBits } from "discord.js";
import promptHandler from "./command.handler.js";
import mongoose from "mongoose";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("MongoDB connected!"))
  .catch((err) => {
    console.log("MongoDB could not be connected");
    console.error(err);
  });

client.on("messageCreate", promptHandler);

client.once("disconnect", () => {
  console.log("Bot is disconnected. Closing MongoDB connection.");
  mongoose.connection.close();
});

client.login(process.env.DISCORD_BOT_KEY);
console.log("ChatGPT is online on discord");
