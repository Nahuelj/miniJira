import { res, resData } from "@/helpers/nextResponses";
import { columnManager } from "@/DB/managers/ColumManager";
import { closeConectionDB, connectDB } from "@/DB/connection";
import { finallyCloseConnection } from "@/helpers/finallyCloseConnection";

export async function POST(req) {
  try {
    const { name, creator, owner, index } = await req.json();

    if (!name || !creator || !owner) {
      return res(400);
    }
    await connectDB();
    const newColumn = await columnManager.createColumn(
      name,
      creator,
      owner,
      index
    );

    return resData("newColumn", newColumn);
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
    const columns = await columnManager.getAllColumns();
    return resData("columns", columns);
  } catch (error) {
    console.log(error);
    return res(500);
  } finally {
    await finallyCloseConnection();
  }
}
