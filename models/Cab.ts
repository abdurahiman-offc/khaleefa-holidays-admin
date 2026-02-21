
import mongoose, { Schema, model, models } from "mongoose";

const CabSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Please provide a vehicle name/type"],
        },
        image: {
            type: String,
            required: [true, "Please provide an image URL"],
        },
        price: {
            type: String,
            required: [true, "Please provide a price rate (e.g. per km or day)"],
        },
        features: {
            type: String,
            required: [true, "Please provide features (comma separated)"],
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

export default models.Cab || model("Cab", CabSchema);
