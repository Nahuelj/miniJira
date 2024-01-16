import { verifyTokenJose } from "@/helpers/jwtHelper";
import { connectDB } from "@/DB/connection";
import { UserModel } from "@/DB/models/UserModel";
import { res, resData } from "@/helpers/nextResponses";

export async function GET(req) {
  const authCookie = req.cookies.get("authorization")?.value;

  try {
    const { payload } = await verifyTokenJose(authCookie);
    await connectDB();
    const userCurrent = await UserModel.findById(payload.id);
    const dto = {
      _id: userCurrent._id,
      username: userCurrent.username,
      email: userCurrent.email,
      boards: userCurrent.boards,
      theme: userCurrent.theme,
    };
    return resData("userCurrent", dto);
  } catch (error) {
    return res(500);
  }
}
