import mongoose from "mongoose";
import { BoardModel } from "@/DB/models/BoardModel"; // Asegúrate de importar el modelo "Board" aquí

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    boards: [{ type: mongoose.Schema.Types.ObjectId, ref: BoardModel }],
    userPhoto: { type: String, required: true },
    theme: String,
  },
  { timestamps: true }
);

export const UserModel =
  mongoose.models.User || mongoose.model("User", UserSchema);
