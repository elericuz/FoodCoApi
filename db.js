import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

mongoose.set("allowDiskUse", true);

const portString = !process.env.MONGO_PORT ? "" : `:${process.env.MONGO_PORT}`;

let dbUri = `${process.env.MONGO_PROTOCOL}://${process.env.MONGO_USER}:${encodeURIComponent(process.env.MONGO_PASSWORD)}@${process.env.MONGO_SERVER}${portString}/${process.env.MONGO_DB}`;

const params = [];

if (process.env.MONGO_AUTH_SOURCE) {
    params.push(`authSource=${process.env.MONGO_AUTH_SOURCE}`);
}

if (process.env.MONGO_RETRY_WRITES) {
    params.push(`retryWrites=${process.env.MONGO_RETRY_WRITES}`);
}

if (process.env.MONGO_W) {
    params.push(`w=${process.env.MONGO_W}`);
}

if (process.env.MONGO_APP_NAME) {
    params.push(`appName=${process.env.MONGO_APP_NAME}`);
}

if (params.length > 0) {
    dbUri += "?" + params.join("&");
}

mongoose.connect(dbUri, {})
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch((err) => {
        console.warn("MongoDB URI: " + dbUri);
        console.error("Error connecting to MongoDB:", err.message);
        process.exit(1);
    });

mongoose.connection.setMaxListeners(20);
console.log("Mongo Connection Listeners:", mongoose.connection.listeners("wakeup"));

export default mongoose.connection;
