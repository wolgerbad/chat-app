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
import { getMessages } from './controllers/messageController.js';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { messageService } from './service/messageService.js';
import { userService } from './service/userService.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.memoryStorage();

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

app.post('/upload/:userId', upload.single('test'), async (req, res, next) => {
  const userId = req.params.userId;
  console.log('req.file', req.file);
  console.log('userId', userId);
  console.log('reqbody', req.body);

  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const updatedUser = await userService().updateUser(userId, {
    contentType: req.file.mimetype,
    image: req.file.buffer,
  });

  res.send('updated');
});

app.get('/image/:id', async (req, res, next) => {
  const id = req.params.id;
  const user = await userService().getUser(id);

  res.set('Content-Type', user.contentType);
  res.send(user.image);
});

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
  },
});

io.on('connect', async (socket) => {
  socket.on('message', async (msg) => {
    const message = await messageService().addNewMessage(msg);

    socket.emit('message', message);
  });
});

mongoose
  .connect(process.env.DATABASE_URL)
  .then((cb) => console.log('success'))
  .catch((err) => console.log('cant connect', err));

server.listen(4000, () => console.log('server is up and running'));
