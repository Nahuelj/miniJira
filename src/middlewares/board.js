import { NextResponse } from "next/server";
import { verifyTokenJose } from "@/helpers/jwtHelper";

export async function boardMiddleware(req) {
  if (req.nextUrl.pathname === "/board") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  const authCookie = req.cookies.get("authorization")?.value;
  if (req.nextUrl.pathname.startsWith("/board")) {
    if (!authCookie) {
      return NextResponse.redirect(new URL("/login", req.url));
    } else {
      try {
        await verifyTokenJose(authCookie);
        return NextResponse.next();
      } catch (error) {
        console.log(error);
        return NextResponse.redirect(new URL("/login", req.url));
      }
    }
  }
}
