import { cookies } from "next/headers";
import { verifyTokenJose, createToken } from "@/helpers/jwtHelper";
import { res } from "@/helpers/nextResponses";
import { NextResponse } from "next/server";

export async function setCookieJwt(payload) {
  cookies().set({
    name: "authorization",
    value: createToken(payload),
    httpOnly: true,
    path: "/",
  });
}

export async function cookieJwtValidator(req) {
  const authCookie = req.cookies.get("authorization")?.value;
  if (!authCookie) {
    return res(401);
  }
  try {
    verifyTokenJose(authCookie);
    console.log("valido");
  } catch (error) {
    return res(401);
  }
}
