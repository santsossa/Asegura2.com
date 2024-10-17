import { connect } from "mongoose";

export const initMongoDB = async () => {
  try {
    await connect(
      process.env.MONGO_URI
    );
  } catch (error) {
    throw new Error(error);
  }
};