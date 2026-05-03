
import mongoose, { Schema, model, models } from "mongoose";

const DestinationSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Please provide a name for the destination"],
            maxlength: [60, "Name cannot be more than 60 characters"],
        },
        image: {
            type: String,
            required: [true, "Please provide an image URL for the destination"],
        },
        price: {
            type: String,
            required: [true, "Please provide a starting price"],
        },
        description: {
            type: String,
            required: [true, "Please provide a description"],
        },
        popularDestination: {
            type: Boolean,
            default: false,
        },
        duration: {
            type: String,
            default: "5 Days",
        },
        supportAgent: {
            type: String,
            default: "Muhammed",
        },
        supportNumber: {
            type: String,
            default: "9846223028",
        },
    },
    { timestamps: true }
);

// Prevent model overwrite warning in development
if (mongoose.models.Destination) {
    delete mongoose.models.Destination;
}

export default models.Destination || model("Destination", DestinationSchema);
