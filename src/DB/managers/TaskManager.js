import { TaskModel } from "@/DB/models/TaskModel";

class TaskManager {
  // Constructor para inicializar la instancia
  constructor() {
    // Puedes realizar cualquier configuración necesaria aquí
  }

  // Crear una nueva tarea
  async createTask(
    description,
    creator,
    owner,
    assigned = null,
    finishBy = null
  ) {
    try {
      const newTask = await new TaskModel({
        description,
        creator,
        owner,
        assigned,
        finishBy,
      });
      const savedTask = await newTask.save();
      return savedTask;
    } catch (error) {
      throw new Error(`Error creating task: ${error.message}`);
    }
  }

  // Obtener todas las tareas
  async getAllTasks() {
    try {
      const tasks = await TaskModel.find();
      return tasks;
    } catch (error) {
      throw new Error(`Error getting tasks: ${error.message}`);
    }
  }

  // Obtener una tarea por ID
  async getTaskById(taskId) {
    try {
      const task = await TaskModel.findById(taskId);
      return task;
    } catch (error) {
      throw new Error(`Error getting task: ${error.message}`);
    }
  }

  // Buscar tareas por un campo específico
  async searchTasksByField(fieldName, value) {
    try {
      const query = {};
      query[fieldName] = value;
      const tasks = await TaskModel.find(query);
      return tasks;
    } catch (error) {
      throw new Error(`Error searching tasks: ${error.message}`);
    }
  }

  // Actualizar una tarea por ID
  async updateTask(taskId, updates) {
    try {
      const updatedTask = await TaskModel.findByIdAndUpdate(taskId, updates, {
        new: true,
      });
      return updatedTask;
    } catch (error) {
      throw new Error(`Error updating task: ${error.message}`);
    }
  }

  // Eliminar una tarea por ID
  async deleteTask(taskId) {
    try {
      const deletedTask = await TaskModel.findByIdAndDelete(taskId);
      return deletedTask;
    } catch (error) {
      throw new Error(`Error deleting task: ${error.message}`);
    }
  }
}

// Exportar una instancia ya inicializada
export const taskManager = new TaskManager();
