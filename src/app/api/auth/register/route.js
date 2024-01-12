import { res } from "@/helpers/nextResponses";
import { connectDB, closeConectionDB } from "@/DB/connection";
import { UserModel } from "@/DB/models/UserModel";
import { hashPassword } from "@/helpers/bcryptHelpers";
import { UserValidation } from "@/helpers/validationZod";
import { createToken } from "@/helpers/jwtHelper";
import { cookies } from "next/headers";

export async function POST(NextRequest) {
  try {
    const { username, email, password } = await NextRequest.json();
    if (!username || !email || !password) {
      return res(400);
    }

    // Datos de entrada del formulario
    const formInput = {
      username: username,
      email: email,
      password: password.toString(),
    };
    // Intenta validar los datos de entrada
    const validationResult = UserValidation.safeParse(formInput);
    if (!validationResult.success) {
      return res(400, validationResult.error.issues);
    }

    await connectDB();

    const userFoundEmail = await UserModel.findOne({ email: email });
    const userFoundUsername = await UserModel.findOne({ username: username });
    if (userFoundEmail || userFoundUsername) {
      return res(409);
    }

    const hash = hashPassword(password.toString());
    const newUser = new UserModel({
      username: username,
      email: email,
      password: hash,
      theme: "white",
    });
    await newUser.save();

    cookies().set({
      name: "authorization",
      value: createToken(newUser._id),
      httpOnly: true,
      path: "/",
    });

    return res(201);
  } catch (error) {
    console.log(error);
    return res(500);
  } finally {
    await closeConectionDB();
  }
}
