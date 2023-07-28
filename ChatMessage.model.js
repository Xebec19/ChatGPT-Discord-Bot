import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    author: String,
    role: {
      type: String,
      enum: ["user", "assistant"],
      default: "user",
    },
    message: String,
  },
  {
    timestamps: true,
  }
);

const ChatMessage = mongoose.model("ChatMessage", schema);

export default ChatMessage;
