import { NextResponse } from "next/server";
import { verifyTokenJose } from "@/helpers/jwtHelper";

export default async function middleware(req) {
  const authCookie = req.cookies.get("authorization")?.value;
  if (req.nextUrl.pathname === "/") {
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

  return NextResponse.next();
}
