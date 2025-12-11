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
import { User } from './models/userModel.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/');
  },
  filename: (req, file, cb) => {
    console.log('req,file', file);
    console.log('test', req.file);
    cb(null, Date.now() + file.originalname);
  },
});

function fileFilter(req, file, cb) {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('oops!'), false);
  }
}

const upload = multer({ storage, fileFilter });

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/users', userRouter);
app.use('/api/auth', authRouter);
app.use('/conversations', conversationRouter);
app.use('/messages', messageRouter);
app.use(authError);

app.post('/upload', upload.single('test'), async (req, res, next) => {
  console.log('req.file', req.file);
  console.log('reqbody', req.body);

  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  // Return URL instead of file path
  const imageUrl = `http://localhost:4000/uploads/${req.file.filename}`;
  res.json({ url: imageUrl });

  // const x = await User.updateOne();
});

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
