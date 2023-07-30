import checkGuildId from "./config/allowed-servers.js";
import openai from "./config/open-ai.js";

const COMMAND = "!prompt";

export default async function promptHandler(message) {
  try {
    if (message.author.bot) return;

    if (!message.content.startsWith(COMMAND)) return;

    const guildId = message.guild?.id;

    // check if message is from an authorised server
    if (!checkGuildId({ guildId })) {
      console.log({ "unauthorised guild": guildId });
      message.reply("Unauthorised server!");
      return;
    }

    let conversationContext = [];
    let chatHistory = await message.channel.messages.fetch({ limit: 10 });
    chatHistory.forEach((msg) => {
      conversationContext.push({
        role: !msg.author.bot ? "user" : "assistant",
        content: msg.content,
      });
    });

    conversationContext.reverse();

    let userInput = message.content.substring(COMMAND.length);

    console.log({ user: userInput });

    conversationContext.push({
      role: "user",
      content: userInput,
    });

    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: conversationContext,
      max_tokens: parseInt(process.env.MAX_RESPONSE_LENGTH),
    });

    const completionText = completion.data.choices[0].message.content;

    message.reply(completionText);
  } catch (error) {
    console.error(error);
    message.reply("Something went wrong! Please try after sometime.");
  }
}
