import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRouter from './routes/authRouter.js';
import authError from './errorHandler/error.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import conversationRouter from './routes/conversationRouter.js';
import userRouter from './routes/userRouter.js';
import messageRouter from './routes/messageRouter.js';
import { Message } from './models/messagesModel.js';
import { addNewMessage, getMessages } from './controllers/messageController.js';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/');
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + '-' + file.originalname);
//   },
// });
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const upload = multer({ storage });

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use('/users', userRouter);
app.use('/api/auth', authRouter);
app.use('/conversations', conversationRouter);
app.use('/messages', messageRouter);
app.use(authError);

// app.post('/upload', upload.single('avatar'), (req, res, next) => {
//   console.log('reqfile', path.join(__dirname, 'uploads', req.file.filename));
//   res.sendFile(path.join(__dirname, 'uploads', req.file.filename));
// });

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
  },
});

io.on('connect', async (socket) => {
  socket.on('message', async (msg) => {
    const message = await addNewMessage(msg);

    const messages = await getMessages(message.conversationId);

    socket.emit('messages', messages);
  });
});

mongoose
  .connect(process.env.DATABASE_URL)
  .then((cb) => console.log('success'))
  .catch((err) => console.log('cant connect', err));

server.listen(4000, () => console.log('server is up and running'));
