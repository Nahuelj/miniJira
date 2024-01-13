import { res, resData } from "@/helpers/nextResponses";
import { boardManager } from "@/DB/managers/BoardManager";
import { closeConectionDB, connectDB } from "@/DB/connection";

export async function GET(req) {
  try {
    await connectDB();
    const boards = await boardManager.getAllBoards();
    return resData("boards", boards);
  } catch (error) {
    console.log(error);
    return res(500);
  } finally {
    await closeConectionDB();
  }
}
