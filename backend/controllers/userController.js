import { generateToken } from '../lib/helpers.js';
import { User } from '../models/userModel.js';
import bcrypt from 'bcrypt';

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) throw new Error('Invalid user info');

    const verified = await bcrypt.compare(password, user.password);
    if (!verified) throw new Error('Invalid user info');

    const token = generateToken(user.id);

    res.cookie('jwt', token, {
      httpOnly: true,
    });
    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      image: user.image,
    });
  } catch (error) {
    next(error);
  }
}

export async function signup(req, res, next) {
  try {
    const { name, email, password } = req.body;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.insertOne({
      name,
      email,
      password: hashedPassword,
    });

    const token = generateToken(user.id);

    console.log('token', token);

    res.cookie('jwt', token, {
      httpOnly: true,
    });

    res.json({ id: user._id, name, email });
  } catch (err) {
    next(err);
  }
}

export async function logout(req, res, next) {
  res.cookie('jwt', 'x', {
    maxAge: 1,
    httpOnly: true,
  });
  res.json({ message: 'logout success' });
}

export async function getUser(req, res, next) {
  const id = req.params.id;
  const { name, email, image } = await User.findById(id);

  res.json({ id, name, email, image });
}

export async function updateUser(req, res, next) {
  const field = req.body;
  const id = req.params.id;
  const update = await User.findOneAndUpdate(
    { _id: id },
    { $set: { ...field } },
    { upsert: true, new: true }
  );
  const user = await User.findById(id);
  console.log('user', user);
  res.json(user);
}

export async function findUsers(req, res, next) {
  const val = req.params.val;
  const users = await User.find({ name: { $regex: val, $options: 'i' } });

  res.json(users);
}
