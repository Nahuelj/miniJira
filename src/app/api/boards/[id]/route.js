import { res, resData } from "@/helpers/nextResponses";
import { boardManager } from "@/DB/managers/BoardManager";
import { connectDB } from "@/DB/connection";
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
    const board = await boardManager.getBoardById(id);
    if (!board) {
      return res(404);
    }
    return resData("board", board);
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
    const { name, columns, owner, background, index } = await req.json();
    await connectDB();

    const boardUpdated = await boardManager.updateBoard(id, {
      name,
      columns,
      owner,
      background,
      index,
    });

    if (!boardUpdated) {
      return res(404);
    }

    return resData("boardUpdated", boardUpdated);
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

    const boardDeleted = await boardManager.deleteBoard(id);

    if (!boardDeleted) {
      return res(404);
    }

    return res(200);
  } catch (error) {
    console.log(error);
    return res(500);
  } finally {
    await finallyCloseConnection();
  }
}
