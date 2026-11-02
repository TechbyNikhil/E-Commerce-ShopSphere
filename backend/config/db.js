import mongoose from "mongoose";

const connectDB = async () => {
  // Guard: ensure MONGO_URI is set before attempting connection
  if (!process.env.MONGO_URI) {
    console.error("MONGO_URI is not defined in environment variables.");
    process.exit(1);
  }

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    // Provide actionable error hints without exposing credentials
    const msg = error.message || "";
    if (msg.includes("ENOTFOUND")) {
      console.error("MongoDB Connection Failed: Cluster hostname not found. Check your MONGO_URI cluster address.");
    } else if (msg.includes("Authentication failed")) {
      console.error("MongoDB Connection Failed: Authentication error. Check username/password and ensure special characters are URL-encoded.");
    } else if (msg.includes("URI cannot have port")) {
      console.error("MongoDB Connection Failed: mongodb+srv:// URIs must NOT include a port number. Remove the port from MONGO_URI.");
    } else {
      console.error("MongoDB Connection Failed:", msg);
    }
    process.exit(1);
  }
};

export default connectDB;
