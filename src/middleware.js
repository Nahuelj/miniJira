import { authMiddleware } from "@/middlewares/auth";
import { boardMiddleware } from "@/middlewares/board";
import { loginAndRegisterMiddleware } from "@/middlewares/loginAndRegister";
import { NextResponse } from "next/server";
import { cookieJwtValidatorRoute } from "@/middlewares/cookieValidator";

export default async function middleware(req) {
  const response = await authMiddleware(req);
  if (response) return response;

  const response2 = await boardMiddleware(req);
  if (response2) return response2;

  const response3 = await loginAndRegisterMiddleware(req);
  if (response3) return response3;

  //TERMINAR ESTO
  const response4 = await cookieJwtValidatorRoute(req);
  if (response4) return response3;

  return NextResponse.next();
}
