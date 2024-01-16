import mongoose, { Schema } from "mongoose";

const ColumnSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    tasks: [
      {
        type: Schema.Types.ObjectId,
        ref: "Task",
      },
    ],
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    index: Number,
  },
  { timestamps: true }
);

export const ColumnModel =
  mongoose.models.Colum || mongoose.model("Colum", ColumnSchema);
