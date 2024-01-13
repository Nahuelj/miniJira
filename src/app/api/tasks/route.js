import { res, resData } from "@/helpers/nextResponses";
import { connectDB, closeConectionDB } from "@/DB/connection";

export async function POST(req) {
  return res(201);
}

//OBTENER TODAS
export async function GET() {
  return res.json("hola mundo");
}
