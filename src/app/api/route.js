import { res } from "@/helpers/nextResponses";

export async function GET() {
  return res(200, "hola api");
}
