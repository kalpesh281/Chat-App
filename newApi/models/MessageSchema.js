import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    attachments: [
      {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
    content: String,
    sender: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    chat: {
      type: mongoose.Types.ObjectId,
      ref: "Chats",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const Message =
  mongoose.models.Message || mongoose.model("Message", messageSchema);

export { Message };
