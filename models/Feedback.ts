import mongoose, { Schema, model, models } from "mongoose";

const FeedbackSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Please provide a name"],
        },
        place: {
            type: String,
            required: [true, "Please provide a place"],
        },
        stars: {
            type: Number,
            required: [true, "Please provide a star rating"],
            min: 1,
            max: 5,
        },
        feedback: {
            type: String,
            required: [true, "Please provide feedback text"],
        },
    },
    { timestamps: true }
);

// Prevent model overwrite warning in development
if (mongoose.models.Feedback) {
    delete mongoose.models.Feedback;
}

export default models.Feedback || model("Feedback", FeedbackSchema);
