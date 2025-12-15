import { generateToken } from '../lib/helpers.js';
import bcrypt from 'bcrypt';
import { userRepository } from '../repository/userRepository.js';

export const userService = () => {
  async function login({ email, password }) {
    try {
      const result = await userRepository().getUserByEmail(email);

      const verified = await bcrypt.compare(password, result.password);
      if (!verified) throw new Error('Invalid user info');

      const token = generateToken(result._id);

      return {
        id: result._id,
        name: result.name,
        email: result.email,
        image: result.image,
        token,
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  async function signup({ name, email, password }) {
    try {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);

      const result = await userRepository().addNewUser({
        name,
        email,
        password: hashedPassword,
      });

      console.log('signUP', result);

      const token = generateToken(result._id);

      return { id: result._id, name, email, token };
    } catch (error) {
      throw new Error(error);
    }
  }

  async function getUser(userId) {
    try {
      const result = await userRepository().getUserById(userId);
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  async function updateUser(userId, field) {
    try {
      const result = await userRepository().updateUser(userId, field);

      return { result };
    } catch (error) {
      throw new Error(error);
    }
  }

  async function findUsers(value) {
    const result = await userRepository().findUsersByInput(value);

    return result;
  }

  return { login, signup, getUser, updateUser, findUsers };
};
