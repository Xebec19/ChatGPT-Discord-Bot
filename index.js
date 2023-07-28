import { Client, GatewayIntentBits } from "discord.js";
import openai from "./config/open-ai.js";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

let chatHistory = [];

client.on("messageCreate", async function (message) {
  try {
    if (message.author.bot) return;
    let messages = chatHistory.map(([role, content]) => ({
      role,
      content,
    }));

    let userInput = message.content;

    messages.push({ role: "user", content: userInput });

    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: messages,
    });

    const completionText = completion.data.choices[0].message.content;
    chatHistory.push(["user", userInput]);
    chatHistory.push(["assistant", completionText]);
    message.reply(completionText);
  } catch (error) {
    console.error(error);
  }
});

client.login(process.env.DISCORD_BOT_KEY);
console.log("ChatGPT is online on discord");
