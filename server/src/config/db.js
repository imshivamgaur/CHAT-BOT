import mongoose from "mongoose";

const ConnectToDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGODB_CONNECTION_URI);
    console.log(
      "\nMongodb database connection successfully: ",
      connect.connections[0]._connectionString
    );
  } catch (error) {
    throw new Error(`Db connection failed ${error.message}`);
  }
};

export default ConnectToDB;
