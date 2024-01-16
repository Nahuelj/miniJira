import { verifyTokenJose } from "@/helpers/jwtHelper";
import { NextResponse } from "next/server";

// Define the new middleware function
export async function cookieValidationApi(req) {
  if (
    req.nextUrl.pathname.startsWith("/api/boards") ||
    req.nextUrl.pathname.startsWith("/api/tasks") ||
    req.nextUrl.pathname.startsWith("/api/columns")
  ) {
    const authCookie = req.cookies.get("authorization")?.value;
    if (!authCookie) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    } else {
      try {
        await verifyTokenJose(authCookie);
        return NextResponse.next();
      } catch (error) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
      }
    }
  }

  return NextResponse.next();
}
