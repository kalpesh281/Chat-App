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

export const sampleUserData = [
  {
    id: 1,
    name: "John Doe",
    username: "john_doe",
    friends: 45,
    groups: 5,
    joinedAt: "2023-01-15",
  },
  {
    id: 2,
    name: "Mary Smith",
    username: "mary_s",
    friends: 32,
    groups: 3,
    joinedAt: "2023-02-20",
  },
  {
    id: 3,
    name: "Alex Johnson",
    username: "alex_j",
    friends: 28,
    groups: 4,
    joinedAt: "2023-03-10",
  },
  {
    id: 4,
    name: "Sarah Williams",
    username: "sarah_w",
    friends: 67,
    groups: 8,
    joinedAt: "2022-11-05",
  },
  {
    id: 5,
    name: "Kevin Brown",
    username: "kevin_b",
    friends: 52,
    groups: 6,
    joinedAt: "2022-12-18",
  },
  {
    id: 6,
    name: "Emily Davis",
    username: "emily_d",
    friends: 39,
    groups: 4,
    joinedAt: "2023-04-22",
  },
  {
    id: 7,
    name: "Michael Wilson",
    username: "mike_w",
    friends: 75,
    groups: 9,
    joinedAt: "2022-08-30",
  },
  {
    id: 8,
    name: "Jennifer Garcia",
    username: "jen_g",
    friends: 41,
    groups: 3,
    joinedAt: "2023-05-17",
  },
  {
    id: 9,
    name: "David Martinez",
    username: "david_m",
    friends: 36,
    groups: 5,
    joinedAt: "2023-01-28",
  },
  {
    id: 10,
    name: "Lisa Rodriguez",
    username: "lisa_r",
    friends: 29,
    groups: 2,
    joinedAt: "2023-06-03",
  },
];

export const sampleGroupData = [
  {
    id: 1,
    name: "Project Team Alpha",
    creator: "john_doe",
    members: 8,
    messages: 345,
    createdAt: "2023-02-15",
    lastActive: "2023-08-24",
  },
  {
    id: 2,
    name: "Family Group",
    creator: "mary_s",
    members: 5,
    messages: 782,
    createdAt: "2023-01-10",
    lastActive: "2023-08-25",
  },
  {
    id: 3,
    name: "College Friends",
    creator: "alex_j",
    members: 12,
    messages: 1204,
    createdAt: "2022-11-05",
    lastActive: "2023-08-20",
  },
  {
    id: 4,
    name: "Gaming Squad",
    creator: "mike_w",
    members: 6,
    messages: 567,
    createdAt: "2023-03-22",
    lastActive: "2023-08-25",
  },
  {
    id: 5,
    name: "Book Club",
    creator: "emily_d",
    members: 9,
    messages: 321,
    createdAt: "2023-04-18",
    lastActive: "2023-08-15",
  },
  {
    id: 6,
    name: "Work Team",
    creator: "david_m",
    members: 15,
    messages: 976,
    createdAt: "2022-12-05",
    lastActive: "2023-08-24",
  },
  {
    id: 7,
    name: "Fitness Buddies",
    creator: "sarah_w",
    members: 7,
    messages: 428,
    createdAt: "2023-01-30",
    lastActive: "2023-08-23",
  },
  {
    id: 8,
    name: "Travel Planners",
    creator: "lisa_r",
    members: 4,
    messages: 189,
    createdAt: "2023-05-12",
    lastActive: "2023-08-10",
  },
  {
    id: 9,
    name: "Tech Support",
    creator: "kevin_b",
    members: 11,
    messages: 753,
    createdAt: "2023-02-28",
    lastActive: "2023-08-25",
  },
  {
    id: 10,
    name: "Party Planning",
    creator: "jen_g",
    members: 8,
    messages: 412,
    createdAt: "2023-06-02",
    lastActive: "2023-08-20",
  },
];
