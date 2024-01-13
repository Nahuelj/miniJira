import { ColumnModel } from "@/DB/models/ColumnModel";

class ColumnManager {
  async createColumn(name, maker, owner, index) {
    try {
      const newColumn = new ColumnModel({
        name,
        tasks: [],
        maker,
        owner,
        index,
      });
      const savedColumn = await newColumn.save();
      return savedColumn;
    } catch (error) {
      throw new Error(`Error creating column: ${error.message}`);
    }
  }

  async getAllColumns() {
    try {
      const columns = await ColumnModel.find();
      return columns;
    } catch (error) {
      throw new Error(`Error getting columns: ${error.message}`);
    }
  }

  async getColumnById(columnId) {
    try {
      const column = await ColumnModel.findById(columnId);
      return column;
    } catch (error) {
      throw new Error(`Error getting column: ${error.message}`);
    }
  }

  async updateColumn(columnId, updates) {
    try {
      const updatedColumn = await ColumnModel.findByIdAndUpdate(
        columnId,
        updates,
        { new: true }
      );
      return updatedColumn;
    } catch (error) {
      throw new Error(`Error updating column: ${error.message}`);
    }
  }

  async deleteColumn(columnId) {
    try {
      const deletedColumn = await ColumnModel.findByIdAndDelete(columnId);
      return deletedColumn;
    } catch (error) {
      throw new Error(`Error deleting column: ${error.message}`);
    }
  }

  async searchColumnsByField(fieldName, value) {
    try {
      const query = {};
      query[fieldName] = value;
      const columns = await ColumnModel.find(query);
      return columns;
    } catch (error) {
      throw new Error(`Error searching columns: ${error.message}`);
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
export const columnManager = new ColumnManager();
