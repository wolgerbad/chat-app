import { Router } from 'express';
import {
  getUser,
  updateUser,
  findUsers,
} from '../controllers/userController.js';

const router = Router();

router.get('/:id', getUser);

router.get('/search/:val', findUsers);

router.put('/:id', updateUser);

export default router;
