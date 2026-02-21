import mongoose, { Schema, model, models } from "mongoose";

const SubmissionSchema = new Schema(
    {
        type: {
            type: String,
            required: [true, "Please provide a submission type"],
            enum: ["Contact", "Destination", "B2B"],
        },
        name: {
            type: String,
            required: [true, "Please provide a name"],
        },
        phone: {
            type: String,
            required: [true, "Please provide a phone number"],
        },
        message: {
            type: String,
            required: [true, "Please provide a message"],
        },
        destinationName: {
            type: String,
            required: function (this: any) {
                return this.type === "Destination";
            },
        },
    },
    { timestamps: true }
);

export default models.Submission || model("Submission", SubmissionSchema);
