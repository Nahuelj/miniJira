import { userManager } from "@/DB/managers/UserManager";
import { res, resData } from "@/helpers/nextResponses";
import mongoose from "mongoose";
import { verifyTokenJose } from "@/helpers/jwtHelper";
import { connectDB } from "@/DB/connection";

export async function PATCH(req, { params }) {
  try {
    const { id } = params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res(400);
    }
    const authCookie = req.cookies.get("authorization")?.value;
    const { payload } = await verifyTokenJose(authCookie);
    await connectDB();
    const res = await userManager.addBoardToUser(payload.id, id);
    return resData("boardAdded", res);
  } catch (error) {
    console.log(error);
    return res(500);
  }
}
