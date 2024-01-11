import jwt from "jsonwebtoken";
import { jwtVerify } from "jose";

// Función para generar un JWT
export function createToken(userId) {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "5h" });
}

// Función para verificar un JWT
export function verifyToken(token) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return null;
  }
}

// Función para verificar un JWT
export function verifyTokenJose(token) {
  try {
    // Convierte la clave secreta a un Uint8Array
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);

    return jwtVerify(token, secret);
  } catch (error) {
    return null;
  }
}
