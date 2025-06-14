export const sampleChats = [
  {
    avatar: ["https://example.com/avatar1.jpg"],
    name: "Jony",
    _id: "1",
    groupChat: false,
    members: ["1", "2"],
  },
  {
    avatar: ["https://example.com/avatar2.jpg"],

    name: "Mary",
    _id: "2",
    groupChat: false,
    members: ["1", "3", "4"],
  },
  {
    avatar: ["https://example.com/avatar3.jpg"],
    name: "Alex",
    _id: "3",
    groupChat: false,
    members: ["1", "2", "4"],
  },
  {
    avatar: ["https://example.com/avatar4.jpg"],
    name: "Sarah",
    _id: "4",
    groupChat: false,

    members: ["2", "3"],
  },
  {
    avatar: ["https://example.com/avatar5.jpg"],
    name: "Kevin",
    _id: "5",
    groupChat: false,
    members: ["1", "2", "3", "4"],
  },
];

export const sampleUsers = [
  {
    avatar: ["https://example.com/avatar1.jpg"],
    name: "Jony",
    _id: "1",
  },
  {
    avatar: ["https://example.com/avatar2.jpg"],

    name: "Mary",
    _id: "2",
  },
  {
    avatar: ["https://example.com/avatar3.jpg"],
    name: "Alex",
    _id: "3",
  },
  {
    avatar: ["https://example.com/avatar4.jpg"],
    name: "Sarah",
    _id: "4",
  },
];

export const sampleNotification = [
  {
    sender: {
      avatar: ["https://example.com/avatar1.jpg"],
      name: "Jony",
    },
    _id: "1",
  },
  {
    sender: {
      avatar: ["https://example.com/avatar2.jpg"],
      name: "Mary",
    },
    _id: "2",
  },
  {
    sender: {
      avatar: ["https://example.com/avatar3.jpg"],
      name: "Alex",
    },
    _id: "3",
  },
];

export const sampleMessages = [
  {
    attachments: [
      {
        public_id: "asd",
        url: "https://images.pexels.com/photos/326055/pexels-photo-326055.jpeg",
      },
    ],
    content: "Hello, how are you?",
    _id: "1",
    sender: {
      avatar: ["https://example.com/avatar1.jpg"],
      name: "Jony",
      _id: "1",
    },
    chat: "chat1",
    createdAt: "2023-10-01T12:00:00Z",
  },
  {
    attachments: [],
    content: "I'm good, thanks! How about you?",
    _id: "2",
    sender: {
      avatar: ["https://example.com/avatar2.jpg"],
      name: "Mary",
      _id: "12345",
    },
    chat: "chat1",
    createdAt: "2023-10-01T12:01:00Z",
  },
  {
    attachments: [
      {
        public_id: "asd2",
        url: "https://images.pexels.com/photos/326055/pexels-photo-326055.jpeg",
      },
    ],
    content: "Check out this image!",
    _id: "3",
    sender: {
      avatar: ["https://example.com/avatar1.jpg"],
      name: "Jony",
      _id: "1",
    },
    chat: "chat1",
    createdAt: "2023-10-01T12:02:00Z",
  },
];
