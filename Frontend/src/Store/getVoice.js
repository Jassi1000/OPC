import {create} from "zustand";

import axios from "axios";

const useVoiceStore = create((set) => ({
  voice:null,
  audioUrl : "https://res.cloudinary.com/dr99qbotj/video/upload/v1757670698/ElevenLabs_Text_to_Speech_audio_ff6u8y.mp3",
  setAudioUrl: (audioUrl) => set({ audioUrl }),
  setVoice: (language) => set({ language }),
  getAudio: async (language) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/v1/data?language=${language}`);
      console.log("API response:", response.data);
      set({ voice: response.data.voice });
      const audioUrl = response.data.voice.audioUrl;
      set({ audioUrl });
    } catch (error) {
      console.error("Error fetching audio:", error);
    }
  },
}));

export { useVoiceStore };