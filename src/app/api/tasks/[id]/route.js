import { res, resData } from "@/helpers/nextResponses";
import { taskManager } from "@/DB/managers/TaskManager";
import { connectDB, closeConectionDB } from "@/DB/connection";
import mongoose from "mongoose";

//OBTENER POR ID

export async function GET(req, { params }) {
  try {
    const { id } = params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res(400);
    }

    await connectDB();
    const task = await taskManager.getTaskById(id);
    if (!task) {
      return res(404);
    }
    return resData("task", task);
  } catch (error) {
    console.log(error);
    return res(500);
  } finally {
    try {
      await closeConectionDB();
    } catch (error) {
      console.log(error);
      return res(500);
    }
  }
}

//ACTUALIZAR POR ID

export async function PUT(req, { params }) {
  try {
    const { id } = params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res(400);
    }
    const { description, creator, owner, assigned, finishBy, index } =
      await req.json();
    await connectDB();
    const task = await taskManager.getTaskById(id);
    if (!task) {
      return res(404);
    }
    const taskUpdated = await taskManager.updateTask(id, {
      description,
      creator,
      owner,
      assigned,
      finishBy,
      index,
    });
    return resData("taskUpdated", taskUpdated);
  } catch (error) {
    console.log(error);
    return res(500);
  } finally {
    try {
      await closeConectionDB();
    } catch (error) {
      console.log(error);
      return res(500);
    }
  }
}

//BORRAR POR ID

export async function DELETE() {
  try {
    const { id } = params;
    await connectDB();
    const task = await taskManager.getTaskById(id);
    if (!task) {
      return res(404);
    }

    const taskDeleted = await taskManager.deleteTask(id);

    return resData("taskDeleted", taskDeleted);
  } catch (error) {
    console.log(error);
    return res(500);
  } finally {
    try {
      await closeConectionDB();
    } catch (error) {
      console.log(error);
      return res(500);
    }
  }
}
