import openai from "./config/open-ai";

async function main() {
  const chatHistory = [];
  try {
    const messages = chatHistory.map(([role, content]) => ({
      role,
      content,
    }));

    messages.push({ role: "user", content: userInput });

    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: messages,
    });

    const completionText = completion.data.choices[0].message.content;

    console.log("Bot: " + completionText);
    chatHistory.push(["user", "user-input-goes-here"]);
    chatHistory.push(["assistant", completionText]);
  } catch (error) {
    console.error(error);
  }
}

main();
