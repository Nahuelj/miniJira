import { NextResponse } from "next/server";

export function res(statusCode = 200, messageJsonObject = {}) {
  const statusMessages = {
    200: "OK",
    201: "Created",
    202: "Accepted",
    204: "No Content",
    400: "Bad Request",
    401: "Unauthorized",
    404: "Not Found",
    409: "Conflict", // Agregado el código de estado 409
    500: "Internal Server Error",
    503: "Service Unavailable",
  };

  const statusMessage = statusMessages[statusCode] || "Unknown status code";
  const finalMessage =
    Object.keys(messageJsonObject).length === 0
      ? statusMessage
      : messageJsonObject;

  switch (statusCode) {
    case 200:
    case 201:
    case 202:
    case 204:
      return NextResponse.json(
        { message: finalMessage },
        { status: statusCode }
      );
    case 400:
    case 401:
    case 404:
    case 409: // Agregado el caso 409
    case 500:
    case 503:
      return NextResponse.json({ error: finalMessage }, { status: statusCode });
    default:
      return NextResponse.json(
        { message: "Unknown response" },
        { status: 500 }
      );
  }
}

export function resData(dataName, data) {
  return NextResponse.json({ [dataName]: data }, { status: 200 });
}
