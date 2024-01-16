import { res } from "@/helpers/nextResponses";
import { connectDB, closeConectionDB } from "@/DB/connection";
import { UserModel } from "@/DB/models/UserModel";
import { comparePasswords } from "@/helpers/bcryptHelpers";
import { createToken } from "@/helpers/jwtHelper";
import { cookies } from "next/headers";

export async function POST(NextRequest) {
  try {
    const { email, password } = await NextRequest.json();
    if (!email || !password) {
      return res(400);
    }

    await connectDB();

    const userFoundEmail = await UserModel.findOne({ email: email });
    if (!userFoundEmail) {
      return res(404);
    }

    //validar password con bcrypt

    const compare = comparePasswords(userFoundEmail.password, password);
    if (!compare) {
      return res(401);
    }

    cookies().set({
      name: "authorization",
      value: createToken(userFoundEmail._id),
      httpOnly: true,
      path: "/",
    });

    return res(202);
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
