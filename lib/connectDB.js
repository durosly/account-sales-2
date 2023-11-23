import mongoose from "mongoose";

const connectMongo = async () =>
	await mongoose.connect(process.env.MONGODB_URL, {});

export default connectMongo;
