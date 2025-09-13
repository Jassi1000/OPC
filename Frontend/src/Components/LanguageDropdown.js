import React, { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { useVoiceStore } from "../Store/getVoice";

const languages = [
  { name: "English", flag: "en" },
  { name: "Punjabi", flag: "pa" },
  { name: "Hindi", flag: "hi" },
  { name: "Afrikaans", flag: "af" },
];

export default function LanguageDropdown({setPlay}) {
  const [selected, setSelected] = useState(languages[0]);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const {getAudio,} = useVoiceStore();

  useEffect(() => {
    getAudio(selected.name);
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative inline-block text-left">
      {/* Dropdown menu */}
      {open && (
        <div className="absolute bottom-12 w-48 bg-white border rounded-lg shadow-lg z-10">
          {languages.map((lang) => (
            <div
              key={lang.name}
              onClick={() => {
                setSelected(lang);
                setOpen(false);
                getAudio(lang.name); 
                setPlay(true);
              }}
              className="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100"
            >
              <span className="text-xl">{lang.flag}</span>
              <span className="font-medium">{lang.name}</span>
            </div>
          ))}
        </div>
      )}

      {/* Dropdown button */}
      <button
        className="flex items-center gap-2 px-4 py-2 border rounded-3xl bg-white shadow-sm hover:bg-gray-50"
        onClick={() => setOpen(!open)}
      >
        <p className="text-xl">{selected.flag}</p>
        <p className="font-medium">{selected.name}</p>
        <ChevronDown className="w-4 h-4 ml-2" />
      </button>
    </div>
  );
}
