import { NextResponse } from "next/server";
import { verifyToken } from "@/helpers/jwtHelper";

export default function middleware(req) {
  const authCookie = req.cookies.get("authorization");
  if (req.nextUrl.pathname === "/register") {
    if (!authCookie) {
      return NextResponse.redirect(new URL("/login", req.url));
    } else {
      const result = verifyToken(authCookie.value);
      console.log("resutl", result);
      console.log("cookie", authCookie);
    }
  }
}
