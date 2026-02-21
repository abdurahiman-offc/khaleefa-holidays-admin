
import mongoose, { Schema, model, models } from "mongoose";

const RoomSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Please provide a room name"],
        },
        image: {
            type: String,
            required: [true, "Please provide an image URL"],
        },
        price: {
            type: String,
            required: [true, "Please provide a price per night"],
        },
        amenities: {
            type: String,
            required: [true, "Please provide amenities (comma separated)"],
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

export default models.Room || model("Room", RoomSchema);
