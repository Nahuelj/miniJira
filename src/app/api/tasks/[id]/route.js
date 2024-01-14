import { res, resData } from "@/helpers/nextResponses";
import { taskManager } from "@/DB/managers/TaskManager";
import { connectDB, closeConectionDB } from "@/DB/connection";

//OBTENER POR ID

export async function GET(req, { params }) {
  try {
    const { id } = params;
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
    const { description, creator, owner, assigned, finishBy, index } =
      await req.json();

    if (
      !description ||
      !creator ||
      !owner ||
      !assigned ||
      !finishBy ||
      !index
    ) {
      return res(400);
    }
    const { id } = params;
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
  return res.json("hola mundo");
}
