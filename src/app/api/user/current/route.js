import { verifyTokenJose } from "@/helpers/jwtHelper";
import { connectDB } from "@/DB/connection";
import { UserModel } from "@/DB/models/UserModel";
import { res, resData } from "@/helpers/nextResponses";

export async function GET(req) {
  try {
    const authCookie = req.cookies.get("authorization")?.value;
    const { payload } = await verifyTokenJose(authCookie);
    await connectDB();
    const userCurrent = await UserModel.findById(payload.id)
      .populate({
        path: "boards",
        select: "name _id owner", // Aquí especificas los campos que deseas poblar de la colección Board
      })
      .lean();

    const dto = {
      _id: userCurrent._id,
      username: userCurrent.username,
      email: userCurrent.email,
      boards: userCurrent.boards,
      theme: userCurrent.theme,
      userPhoto: userCurrent.userPhoto,
    };
    return resData("userCurrent", dto);
  } catch (error) {
    console.log(error);
    return res(500);
  }
}
