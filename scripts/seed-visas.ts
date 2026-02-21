
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

const visas = [
    {
        country: "UAE",
        visaType: "Tourist Visa",
        image: "https://images.unsplash.com/photo-1512453979798-5ea904ac66de?auto=format&fit=crop&q=80&w=1000",
        processingDays: 3,
        validity: 30,
        cost: 7500,
        contactPerson: "Ahmed",
        contactNumber: "9876543210"
    },
    {
        country: "Saudi Arabia",
        visaType: "Business Visa",
        image: "https://images.unsplash.com/photo-1586724237569-f3d0c1dee8c6?auto=format&fit=crop&q=80&w=1000",
        processingDays: 5,
        validity: 90,
        cost: 12000,
        contactPerson: "Fatima",
        contactNumber: "9123456789"
    }
];

async function seedVisas() {
    console.log("🚀 Starting Visa seed...");

    try {
        await mongoose.connect(MONGODB_URI!);
        console.log("✅ Connected to MongoDB successfully!");

        // Define schema inline to ensure we use the NEW structure
        // (This helps if we run this script standalone)
        // But importantly, we want to test if the APP accepts this data.
        // So we will just use flexible schema here to insert, 
        // BUT the real test is if the APP displays it.

        // Actually, let's use the explicit schema to be safe
        const VisaSchema = new mongoose.Schema(
            {
                country: { type: String, required: true },
                visaType: { type: String, required: true },
                image: { type: String, required: true },
                processingDays: { type: Number, required: true },
                validity: { type: Number, required: true },
                cost: { type: Number, required: true },
                contactNumber: { type: String, default: "9846223028" },
                contactPerson: { type: String, default: "Muhammed" }
            },
            { timestamps: true }
        );

        // Recompile model if it exists (for script execution)
        if (mongoose.models.Visa) {
            delete mongoose.models.Visa;
        }
        const Visa = mongoose.model("Visa", VisaSchema);

        // Clear existing data
        console.log("🧹 Clearing existing Visas...");
        await Visa.deleteMany({});
        console.log("✅ Cleared old data.");

        // Insert new data
        console.log("🌱 Seeding Visas...");
        await Visa.insertMany(visas);
        console.log(`✅ Seeded ${visas.length} visas.`);

        console.log("✨ Visa seeding completed successfully!");
        process.exit(0);

    } catch (error) {
        console.error("❌ Seeding failed:");
        console.error(error);
        process.exit(1);
    }
}

seedVisas();
