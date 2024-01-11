import mongoose from "mongoose";

export async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Mongoose is connected");
  } catch (err) {
    console.error("Could not connect to MongoDB Atlas: ", err);
  }
}
