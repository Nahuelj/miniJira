import { BoardModel } from "@/DB/models/BoardModel";
import { UserModel } from "@/DB/models/UserModel";

class UserManager {
  async createUser(username, email, password, theme) {
    try {
      const newUser = new UserModel({
        username,
        email,
        password,
        theme,
        boards: [],
      });
      const savedUser = await newUser.save();
      return savedUser;
    } catch (error) {
      throw new Error(`Error creating user: ${error.message}`);
    }
  }

  async getAllUsers() {
    try {
      const users = await UserModel.find();
      return users;
    } catch (error) {
      throw new Error(`Error getting users: ${error.message}`);
    }
  }

  async getUserById(userId) {
    try {
      const user = await UserModel.findById(userId);
      return user;
    } catch (error) {
      throw new Error(`Error getting user: ${error.message}`);
    }
  }

  async updateUser(userId, updates) {
    try {
      const updatedUser = await UserModel.findByIdAndUpdate(userId, updates, {
        new: true,
      });
      return updatedUser;
    } catch (error) {
      throw new Error(`Error updating user: ${error.message}`);
    }
  }

  async deleteUser(userId) {
    try {
      const deletedUser = await UserModel.findByIdAndDelete(userId);
      return deletedUser;
    } catch (error) {
      throw new Error(`Error deleting user: ${error.message}`);
    }
  }

  async searchUsersByField(fieldName, value) {
    try {
      const query = {};
      query[fieldName] = value;
      const users = await UserModel.find(query);
      return users;
    } catch (error) {
      throw new Error(`Error searching users: ${error.message}`);
    }
  }

  async addBoardToUser(userId, boardId) {
    try {
      const user = await UserModel.findById(userId);
      if (!user) {
        throw new Error("User not found");
      }

      const board = await BoardModel.findById(boardId);
      if (!board) {
        throw new Error("Board not found");
      }

      // Verificar si el tablero ya está en la lista de tableros del usuario
      const isBoardAlreadyAdded = user.boards.includes(boardId);
      if (isBoardAlreadyAdded) {
        throw new Error("Board is already added to the user");
      }

      if (board.owner.toString() !== user._id.toString()) {
        // Agregar el ID del tablero a la lista de tableros del usuario
        throw new Error("The user does not have permissions to add this board");
      }
      user.boards.push(boardId);
      await user.save();
      return user;
    } catch (error) {
      throw new Error(`Error adding board to user: ${error.message}`);
    }
  }
}

// Exportar una instancia ya inicializada
export const userManager = new UserManager();
