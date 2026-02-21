
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

const rooms = [
    {
        name: "Deluxe Ocean View",
        image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80&w=2525&ixlib=rb-4.0.3",
        price: "₹ 4,500 / night",
        amenities: "King Bed, Ocean View, Free WiFi, Breakfast Included, Balcony",
        contactPerson: "Reservations Desk",
        contactNumber: "9846223028"
    },
    {
        name: "Standard Double Room",
        image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&q=80&w=2670&ixlib=rb-4.0.3",
        price: "₹ 2,800 / night",
        amenities: "Double Bed, City View, Free WiFi, AC",
        contactPerson: "Front Desk",
        contactNumber: "9846223028"
    }
];

const cabs = [
    {
        name: "Toyota Innova Crysta",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Toyota_Innova_Crysta_2.4_Z_%28front%29.jpg/1200px-Toyota_Innova_Crysta_2.4_Z_%28front%29.jpg",
        price: "₹ 18 / km",
        features: "7 Seater, AC, Music System, Experienced Driver, Clean Interiors",
        contactPerson: "Transport Manager",
        contactNumber: "9846223028"
    },
    {
        name: "Suzuki Dzire",
        image: "https://imgd.aeplcdn.com/1200x900/n/cw/ec/45691/dzire-exterior-right-front-three-quarter-3.jpeg?q=80",
        price: "₹ 12 / km",
        features: "4 Seater, AC, Budget Friendly, City Travel",
        contactPerson: "Transport Manager",
        contactNumber: "9846223028"
    }
];

async function seed() {
    console.log("🚀 Starting database seed...");
    console.log(`📡 Connecting to MongoDB at: ${MONGODB_URI?.split("@")[1] || "Hidden URI"}`);

    try {
        await mongoose.connect(MONGODB_URI!);
        console.log("✅ Connected to MongoDB successfully!");

        // Define Schemas inline to avoid import issues if models execute side-effects
        // We reuse the exact schema definitions from your project
        const RoomSchema = new mongoose.Schema(
            {
                name: { type: String, required: true },
                image: { type: String, required: true },
                price: { type: String, required: true },
                amenities: { type: String, required: true },
                contactNumber: { type: String, default: "9846223028" },
                contactPerson: { type: String, default: "Muhammed" }
            },
            { timestamps: true }
        );
        const Room = mongoose.models.Room || mongoose.model("Room", RoomSchema);

        const CabSchema = new mongoose.Schema(
            {
                name: { type: String, required: true },
                image: { type: String, required: true },
                price: { type: String, required: true },
                features: { type: String, required: true },
                contactNumber: { type: String, default: "9846223028" },
                contactPerson: { type: String, default: "Muhammed" }
            },
            { timestamps: true }
        );
        const Cab = mongoose.models.Cab || mongoose.model("Cab", CabSchema);

        // Clear existing data
        console.log("🧹 Clearing existing Rooms and Cabs...");
        await Room.deleteMany({});
        await Cab.deleteMany({});
        console.log("✅ Cleared old data.");

        // Insert new data
        console.log("🌱 Seeding Rooms...");
        await Room.insertMany(rooms);
        console.log(`✅ Seeded ${rooms.length} rooms.`);

        console.log("🌱 Seeding Cabs...");
        await Cab.insertMany(cabs);
        console.log(`✅ Seeded ${cabs.length} cabs.`);

        console.log("✨ Database seeding completed successfully!");
        process.exit(0);

    } catch (error) {
        console.error("❌ Database seeding failed:");
        console.error(error);
        process.exit(1);
    }
}

seed();
