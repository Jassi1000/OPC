import mongoose from "mongoose";

const voiceSchema = new mongoose.Schema({
    voiceId: { 
        type: String, 
        required: true 
    },
    audioUrl : {
        type: String,
        required: true
    },
    language: {
        type: String,
        required: true
    },
    text : {
        type: String,
        required: true
    }
});

export const Voice = mongoose.model("Voice", voiceSchema);
