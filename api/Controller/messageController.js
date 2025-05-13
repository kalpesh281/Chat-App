const { getReceiverSocketId, getIO } = require("../socket/socket");
const Conversation = require("../Model/converstionModel");
const Message = require("../Model/messageModel");

const sendMessage = async (req, res) => {
  try {
    senderId = req.id;
    receiverId = req.params.id;
    const { message } = req.body;
    // console.log(message, "message from frontend");
    // Query for an existing conversation
    let gotConversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    // If no conversation exists, create a new one
    if (!gotConversation) {
      gotConversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = await Message.create({
      senderId,
      receiverId,
      message,
    });

    if (newMessage) {
      gotConversation.messages.push(newMessage._id);
    }
    await gotConversation.save();

    // Socket io implementation

    const receiverSocketId = getReceiverSocketId(receiverId);
    const io = getIO(); 

    if (receiverSocketId && io) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    // console.log(newMessage)
    return res.status(201).json({
      newMessage,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getMessages = async (req, res) => {
  try {
    senderId = req.id;
    receiverId = req.params.id;
    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    }).populate("messages");

    return res.status(200).json(conversation?.messages);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  sendMessage,
  getMessages,
};
