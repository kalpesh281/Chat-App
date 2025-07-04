# Real-Time Chat Application

A feature-rich, real-time chat application built with the MERN stack (MongoDB, Express.js, React, Node.js) and Socket.io for real-time communication.

![Chat App](https://via.placeholder.com/800x400?text=Chat+App+Screenshot)

## Features

### User Features

- **Real-time Messaging**: Instant message delivery with typing indicators
- **User Authentication**: Secure login and registration system
- **Friend Management**:
  - Send friend requests to connect with other users
  - Accept/reject incoming friend requests
  - View pending friend requests with notifications
- **Private Chats**: One-on-one conversations with friends
- **Group Chats**:
  - Create and manage group conversations
  - Add members to existing groups
  - Remove members from groups
  - Leave groups you're part of
- **Media Sharing**:
  - Send and receive images
  - Share video files
  - Exchange audio messages
  - Send document files
- **Rich Message Features**:
  - Real-time typing indicators
  - Message status (sent, delivered)
  - Unread message count indicators
- **Notifications**:
  - Real-time notifications for new messages
  - Friend request alerts
  - Group activity notifications
- **User Profiles**: View and manage user profiles

### Group Chat Features

- **Create Groups**: Create new group chats with multiple participants
- **Member Management**: Add or remove members from groups
- **Admin Controls**: Group creators have administrative privileges
- **Group Settings**: Rename groups, manage membership
- **Leave Group**: Option to leave a group chat
- **Group Info**: View member list and group details

### UI/UX

- **Modern Interface**: Clean, responsive design with Material UI
- **Real-time Indicators**: See when users are typing
- **Message Status**: View message delivery status
- **Smooth Animations**: Enhanced user experience with subtle animations
- **Mobile Responsive**: Works seamlessly on different screen sizes
- **Dynamic Layouts**: Adaptive design for different content types

### Admin Panel Features

- **Comprehensive Dashboard**:
  - Overview of system statistics with visual charts
  - Total user count metrics
  - Total message count with trends
  - Active chats and groups analytics
  - User growth visualization
- **User Management**:
  - View complete user list
  - User activity statistics
  - Account details and status
- **Group Management**:
  - Monitor all group chats
  - View group creators and members
  - Track group message activity
- **Message Monitoring**:
  - Track message statistics
  - Message volume analysis
  - Content type distribution (text vs media)
- **System Overview**: Charts and metrics for overall system health

## Technology Stack

### Frontend

- **React**: UI library for building the user interface
- **Redux**: State management with Redux Toolkit
- **Material UI**: Component library for consistent design
- **Socket.io-client**: Real-time client-server communication
- **Framer Motion**: Animations for enhanced UX
- **React Router**: Navigation and routing
- **Vite**: Fast build tool and development server
- **Chart.js**: Data visualization for the admin dashboard

### Backend

- **Node.js**: JavaScript runtime for the server
- **Express.js**: Web framework for Node.js
- **MongoDB**: NoSQL database for data storage
- **Mongoose**: MongoDB object modeling for Node.js
- **Socket.io**: Real-time bidirectional event-based communication
- **JWT**: JSON Web Tokens for authentication
- **Bcrypt**: Password hashing for security
- **Cloudinary**: Cloud storage for media files

## Installation and Setup

### Prerequisites

- Node.js (v14 or later)
- MongoDB
- npm or yarn

### Backend Setup

1. Navigate to the API directory:

   ```bash
   cd newApi
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:

   ```
   PORT=5001
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   CLIENT_URL=http://localhost:3000
   CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```

4. Start the server:
   ```bash
   npm start
   ```
   For development with auto-restart:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to the client directory:

   ```bash
   cd newClient
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with:

   ```
   VITE_API_URL=http://localhost:5001/api/v1
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. For production build:
   ```bash
   npm run build
   ```

## Project Structure

```
newApi
├── config
│   └── db.js
├── controllers
│   ├── authController.js
│   ├── chatController.js
│   └── userController.js
├── middleware
│   └── authMiddleware.js
├── models
│   ├── Chat.js
│   ├── Message.js
│   └── User.js
├── routes
│   ├── authRoutes.js
│   ├── chatRoutes.js
│   └── userRoutes.js
├── .env
├── server.js
└── package.json

newClient
├── public
│   └── index.html
├── src
│   ├── assets
│   ├── components
│   ├── pages
│   ├── redux
│   ├── App.jsx
│   ├── main.jsx
│   └── vite-env.d.ts
├── .env
├── index.html
└── package.json
```

## Usage

1. **Register** a new account or **login** if you already have one.
2. **Add friends** to your account to start chatting.
3. **Create groups** for group discussions.
4. **Send messages**, images, and other media in chats.
5. **Receive notifications** for new messages and friend requests.
6. **Manage your profile** and account settings.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/YourFeature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some feature'`)
5. Push to the branch (`git push origin feature/YourFeature`)
6. Open a pull request

Please ensure your code follows the project's coding standards and passes all tests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

This README provides a comprehensive overview of the Real-Time Chat Application, including features, technology stack, installation instructions, project structure, usage guidelines, contribution guidelines, and license information.
