import ChatMessage from "./ChatMessage.model.js";
import openai from "./config/open-ai.js";

const COMMAND = "!prompt";

export default async function promptHandler(message) {
  try {
    if (message.author.bot) return;

    if (!message.content.startsWith(COMMAND)) return;

    const userId = message.author.id;

    let chatHistory = await ChatMessage.find({ author: userId })
      .sort({ createdAt: "desc" })
      .limit(20)
      .lean();

    chatHistory.reverse();

    let messages = chatHistory.map((record) => ({
      role: record.role,
      content: record.message,
    }));

    let userInput = message.content.substring(COMMAND.length);

    messages.push({
      role: "user",
      content: userInput,
    });

    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: messages,
      max_tokens: parseInt(process.env.MAX_RESPONSE_LENGTH),
    });

    const completionText = completion.data.choices[0].message.content;
    let userMessage = new ChatMessage({
      author: userId,
      role: "user",
      message: userInput,
    });
    await userMessage.save();

    let gptMessage = new ChatMessage({
      author: userId,
      role: "assistant",
      message: completionText,
    });
    await gptMessage.save();

    message.reply(completionText);
  } catch (error) {
    console.error(error);
    message.reply("Something went wrong! Please try after sometime.");
  }
}
