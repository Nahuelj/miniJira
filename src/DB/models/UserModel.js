import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  boards: [{ type: mongoose.Schema.Types.ObjectId, ref: "Board" }],
  theme: String,
});

export const UserModel =
  mongoose.models.User || mongoose.model("User", UserSchema);
