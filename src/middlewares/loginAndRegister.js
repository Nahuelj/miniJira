import { NextResponse } from "next/server";
import { verifyTokenJose } from "@/helpers/jwtHelper";

export async function loginAndRegisterMiddleware(req) {
  const authCookie = req.cookies.get("authorization")?.value;

  if (
    req.nextUrl.pathname === "/login" ||
    req.nextUrl.pathname === "/register"
  ) {
    if (authCookie) {
      try {
        await verifyTokenJose(authCookie);
        return NextResponse.redirect(new URL("/", req.url));
      } catch (error) {
        console.log(error);
        return NextResponse.next();
      }
    }
  }
}
