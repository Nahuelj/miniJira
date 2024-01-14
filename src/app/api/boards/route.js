import { res, resData } from "@/helpers/nextResponses";
import { boardManager } from "@/DB/managers/BoardManager";
import { connectDB } from "@/DB/connection";
import { finallyCloseConnection } from "@/helpers/finallyCloseConnection";

export async function POST(req) {
  try {
    const { name, columns, owner, background, index } = await req.json();

    if (!name || !columns || !owner) {
      return res(400);
    }
    await connectDB();
    const newBoard = await boardManager.createBoard(
      name,
      columns,
      owner,
      background,
      index
    );

    return resData("newBoard", newBoard);
  } catch (error) {
    console.log(error);
    return res(500);
  } finally {
    await finallyCloseConnection();
  }
}
//OBTENER TODAS
export async function GET() {
  try {
    await connectDB();
    const boards = await boardManager.getAllBoards();
    return resData("boards", boards);
  } catch (error) {
    console.log(error);
    return res(500);
  } finally {
    await finallyCloseConnection();
  }
}
