import { Voice } from "../Models/voices.js";

export const getVoice = async(req, res) => {
    try {
        const language = req.query.language;
        const voice = await Voice.findOne({ language: language });
        if(!voice) {
            return res.status(404).json({ message: "No voice found for the specified language and voice" });
        }
        res.status(200).json({ voice , message: "Voice fetched successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};