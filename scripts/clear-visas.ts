
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error("❌ MONGODB_URI is not defined in .env.local");
    process.exit(1);
}

async function clearVisas() {
    console.log("🚀 Starting database cleanup for Visas...");

    try {
        await mongoose.connect(MONGODB_URI!);
        console.log("✅ Connected to MongoDB successfully!");

        // Use current schema to connect
        const VisaSchema = new mongoose.Schema({}, { strict: false });
        const Visa = mongoose.models.Visa || mongoose.model("Visa", VisaSchema);

        // Clear existing data
        console.log("🧹 Clearing existing Visas...");
        const result = await Visa.deleteMany({});
        console.log(`✅ Cleared ${result.deletedCount} visas.`);

        console.log("✨ Visa cleanup completed successfully!");
        process.exit(0);

    } catch (error) {
        console.error("❌ Cleanup failed:");
        console.error(error);
        process.exit(1);
    }
}

clearVisas();
