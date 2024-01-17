import mongoose, { Schema } from "mongoose";

const BoardSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    columns: [
      {
        type: Schema.Types.ObjectId,
        ref: "Column",
      },
    ],
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    background: { type: String, default: null },
    index: {
      type: Number,
      default: null,
    },
    team: [{ type: mongoose.Schema.Types.ObjectId, ref: "Board", default: [] }],
  },
  { timestamps: true }
);

export const BoardModel =
  mongoose.models.Board || mongoose.model("Board", BoardSchema);
