import { User } from '../models/userModel.js';

export const userRepository = () => {
  async function getUserByEmail(email) {
    try {
      const user = await User.find({ email });
      return user[0];
    } catch (error) {
      throw new Error('Something went wrong while getting user by email');
    }
  }

  async function getUserById(userId) {
    try {
      const user = await User.findById(userId);
      return user;
    } catch (error) {
      throw new Error('Something went wrong while getting user by id');
    }
  }

  async function addNewUser(user) {
    try {
      const newUser = await User.insertOne({ ...user });
      return newUser;
    } catch (error) {
      throw new Error(error);
    }
  }

  async function updateUser(userId, updateData) {
    try {
      const updatedUser = await User.findOneAndUpdate(
        {
          _id: userId,
        },
        {
          ...updateData,
        },
        {
          upsert: true,
        }
      );

      return updatedUser;
    } catch (error) {
      throw new Error('Something went wrong while updating user.');
    }
  }

  async function findUsersByInput(value) {
    try {
      const users = await User.find({ name: { $regex: value, $options: 'i' } });
      return users;
    } catch (error) {
      throw new Error('Something went wrong while finding users');
    }
  }

  return {
    getUserByEmail,
    getUserById,
    addNewUser,
    updateUser,
    findUsersByInput,
  };
};
