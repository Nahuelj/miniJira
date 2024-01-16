import { res, resData } from "@/helpers/nextResponses";
import { columnManager } from "@/DB/managers/ColumManager";
import { closeConectionDB, connectDB } from "@/DB/connection";

export async function GET(req) {
  try {
    await connectDB();
    const columns = await columnManager.getAllColumns();
    return resData("columns", columns);
  } catch (error) {
    console.log(error);
    return res(500);
  } finally {
    await closeConectionDB();
  }
}
