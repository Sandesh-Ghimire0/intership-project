import mongoose from "mongoose";

const assistantSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },
        question: {
            type: String,
            required: true,
        },
        answer: {
            type: String,
            required: true,
        },
    },
    { timestamps: true },
);

export const Assistant = mongoose.model("Assistant", assistantSchema);
