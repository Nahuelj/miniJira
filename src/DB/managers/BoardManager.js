import { ColumnModel } from "@/DB/models/ColumnModel";

class BoardManager {
  async createBoard(name, owner, index) {
    try {
      const newBoard = new BoardModel({
        name,
        columns: [],
        owner,
        index,
      });
      const savedBoard = await newBoard.save();
      return savedBoard;
    } catch (error) {
      throw new Error(`Error creating board: ${error.message}`);
    }
  }

  async getAllBoards() {
    try {
      const boards = await BoardModel.find();
      return boards;
    } catch (error) {
      throw new Error(`Error getting boards: ${error.message}`);
    }
  }

  async getBoardById(boardId) {
    try {
      const board = await BoardModel.findById(boardId);
      return board;
    } catch (error) {
      throw new Error(`Error getting board: ${error.message}`);
    }
  }

  async updateBoard(boardId, updates) {
    try {
      const updatedBoard = await BoardModel.findByIdAndUpdate(
        boardId,
        updates,
        { new: true }
      );
      return updatedBoard;
    } catch (error) {
      throw new Error(`Error updating board: ${error.message}`);
    }
  }

  async deleteBoard(boardId) {
    try {
      const deletedBoard = await BoardModel.findByIdAndDelete(boardId);
      return deletedBoard;
    } catch (error) {
      throw new Error(`Error deleting board: ${error.message}`);
    }
  }

  async searchBoardsByField(fieldName, value) {
    try {
      const query = {};
      query[fieldName] = value;
      const boards = await BoardModel.find(query);
      return boards;
    } catch (error) {
      throw new Error(`Error searching boards: ${error.message}`);
    }
  }

  async addTaskToColumn(columnId, taskId) {
    try {
      const column = await ColumnModel.findById(columnId);
      if (!column) {
        throw new Error("Column not found");
      }

      const task = await TaskModel.findById(taskId);
      if (!task) {
        throw new Error("Task not found");
      }

      // Verificar si la tarea ya está en la lista de tareas de la columna
      const isTaskAlreadyAdded = column.tasks.includes(taskId);
      if (isTaskAlreadyAdded) {
        throw new Error("Task is already added to the column");
      }

      // Agregar el ID de la tarea a la lista de tareas en la columna
      column.tasks.push(taskId);
      await column.save();

      return column;
    } catch (error) {
      throw new Error(`Error adding task to column: ${error.message}`);
    }
  }
}

// Exportar una instancia ya inicializada
export const boardManager = new BoardManager();
