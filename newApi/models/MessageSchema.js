import { Schema, Types, model, models } from "mongoose";

const messageSchema = new Schema(
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
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    chat: {
      type: Types.ObjectId,
      ref: "Chats",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const Message = models.Message || model("Messages", chatSchema);
