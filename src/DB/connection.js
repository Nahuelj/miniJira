import mongoose from "mongoose";

export async function connectDB() {
  if (mongoose.connection.readyState === 0) {
    // 0 means disconnected
    try {
      await mongoose.connect(process.env.MONGO_URI);
      console.log("Mongoose is connected");
    } catch (err) {
      console.error("Could not connect to MongoDB Atlas: ", err);
    }
  }
}

export async function closeConectionDB() {
  try {
    await mongoose.connection.close();
    console.log("Connection to MongoDB closed");
  } catch (error) {
    console.error("Error closing connection:", error);
  }
}
