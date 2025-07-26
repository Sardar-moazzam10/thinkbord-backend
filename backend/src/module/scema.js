import mongoose from "mongoose";
const notesSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,

        },

        content: {
            type: String,
            required: true,
            trim: true,
        },
    }, {
    timestamps: true,
}
);
const Notes = mongoose.models.notes || mongoose.model("notes", notesSchema);
export default Notes;