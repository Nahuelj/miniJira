import { res, resData } from "@/helpers/nextResponses";
import { taskManager } from "@/DB/managers/TaskManager";
import { closeConectionDB, connectDB } from "@/DB/connection";

export async function POST(req) {
  try {
    const { description, creator, owner } = await req.json();

    if (!description || !creator || !owner) {
      return res(400);
    }
    await connectDB();
    const newTask = await taskManager.createTask(description, creator, owner);

    return resData("newTask", newTask);
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
//OBTENER TODAS
export async function GET() {
  try {
    await connectDB();
    const tasks = await taskManager.getAllTasks();
    return resData("tasks", tasks);
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
