
import mongoose, { Schema, model, models } from "mongoose";

const VisaSchema = new Schema(
    {
        country: {
            type: String,
            required: [true, "Please provide a country name"],
        },
        visaType: {
            type: String,
            required: [true, "Please provide a visa type"],
            enum: ["Tourist", "Business", "Job seeker", "Umrah", "Family"],
            default: "Tourist",
        },
        category: {
            type: String,
            required: [true, "Please provide a category"],
            enum: ["GCC", "Schengen", "Asia"],
            default: "Asia",
        },
        requirements: {
            type: [String],
            default: [],
        },
        image: {
            type: String,
            required: [true, "Please provide an image URL"],
        },
        processingDays: {
            type: Number,
            required: [true, "Please provide processing days"],
        },
        validity: {
            type: Number,
            required: [true, "Please provide visa validity in days"],
        },
        cost: {
            type: Number,
            required: [true, "Please provide visa cost"],
        },
        contactNumber: {
            type: String,
            default: "9846223028"
        },
        contactPerson: {
            type: String,
            default: "Muhammed"
        }
    },
    { timestamps: true }
);

// Prevent model overwrite warning in development
if (mongoose.models.Visa) {
    delete mongoose.models.Visa;
}

export default model("Visa", VisaSchema);
