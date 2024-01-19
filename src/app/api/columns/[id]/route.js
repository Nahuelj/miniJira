import { res, resData } from "@/helpers/nextResponses";
import { columnManager } from "@/DB/managers/ColumManager";
import { connectDB, closeConectionDB } from "@/DB/connection";
import mongoose from "mongoose";
import { finallyCloseConnection } from "@/helpers/finallyCloseConnection";

//OBTENER POR ID

export async function GET(req, { params }) {
  try {
    const { id } = params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res(400);
    }

    await connectDB();
    const column = await columnManager.getColumnById(id);
    if (!column) {
      return res(404);
    }
    return resData("column", column);
  } catch (error) {
    console.log(error);
    return res(500);
  } finally {
    await finallyCloseConnection();
  }
}

//ACTUALIZAR POR ID

export async function PUT(req, { params }) {
  try {
    const { id } = params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res(400);
    }
    const { name, tasks, creator, owner, index } = await req.json();
    await connectDB();

    const columnUpdated = await columnManager.updateColumn(id, {
      name,
      tasks,
      creator,
      owner,
      index,
    });

    if (!columnUpdated) {
      return res(404);
    }
    return resData("columnUpdated", columnUpdated);
  } catch (error) {
    console.log(error);
    return res(500);
  } finally {
    await finallyCloseConnection();
  }
}

//BORRAR POR ID

export async function DELETE(req, { params }) {
  try {
    const { id } = params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res(400);
    }

    await connectDB();
    const column = await columnManager.deleteColumn(id);

    if (!column) {
      return res(404);
    }

    return res(200);
  } catch (error) {
    console.error(error);
    return res(500);
  } finally {
    await finallyCloseConnection();
  }
}


