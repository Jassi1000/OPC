import React, { useEffect, useState } from 'react'
import logo from '../Assets/logo.png'
import { AudioLines, Download } from 'lucide-react'
import LanguageDropdown from '../Components/LanguageDropdown'
import image from '../Assets/image.jpg'
import bgtext from '../Assets/bgtext.png'
import AudioPlay from '../Components/audioPlay'
import { useVoiceStore } from '../Store/getVoice'
const Dashboard = () => {
    const {voice} = useVoiceStore();
    
    const [active, setActive] = useState(0);
    const [text, setText] = useState("");
    const [play, setPlay] = useState(false);

    useEffect(() => {  
        if (voice) {
            console.log("Voice data updated:", voice);
            setText(voice.text || "");
        }
    }, [voice]);

    const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);

    // Cleanup listener on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);


    const fucnt = [
        "Text to Speech",
        "Agents",
        "Music",
        "Speech to Text",
        "Dubbing",
        "Voice Cloning",
        "ElevenReader"
    ]
    const voices = [
            ["Samara", "Narrate a story",],
            ["2 speakers", "Create a dialogue"],
            ["Announcer", "Voiceover a game"],
            ["Sergeant", "Play a drill sergeant"],
            ["Spuds", "Recount an old story"],
            ["Jessica", "Provide customer support"],
    ]
    const menuItems = [
        "Creative Platform",
        "Agents Platform",
        "Developers",
        "Resources",
        "Enterprise",
        "Pricing",
    ]
    
    
  return (
    <div>
        {/* Navbar */}
        <div className='w-full h-16  flex items-center px-36  justify-between'>
            <img className='w-25 h-10' src={logo} alt="logo" />
            {
                width < 1000 ? null : 
                (
                    <div>
                        {
                            menuItems.map((item, index) => (
                                <button key={index} 
                                className=' px-3 py-1  font-semibold rounded-xl hover:bg-gray-200'
                                >
                                    {item}
                                </button>
                    ))
                }
            </div>
                )
            }
            <div className='flex items-center justify-center'>
                <button className=' px-3 py-1  font-semibold rounded-full hover:bg-gray-300'>
                    Log in
                </button>
                <button className='bg-slate-900 hover:bg-gray-600 text-white px-3 py-1  font-semibold flex items-center justify-center rounded-full ml-3'>
                    Sign Up
                </button>
            </div>
        </div>

        {/* Description of the app */}
        <div>
            <p className='text-5xl text-center mt-20'>
                The most realistic voice AI platform
            </p>
            <p className='text-center mt-8 font-semibold text-lg w-3/5 mx-auto'>
                AI voice models and products powering millions of 
                developers, creators, and enterprises. From low‑latency conversational 
                agents to the leading AI voice generator for voiceovers and audiobooks.
            </p>
            <div className='flex items-center justify-center mt-10 gap-4'>
                <button className='bg-slate-900 hover:bg-gray-600 px-4 py-2 flex text-white font-bold items-center justify-center rounded-full '>
                    SIGN UP
                </button>
                <button className='bg-gray-200 hover:bg-gray-400 px-4 py-2 flex text-sm font-bold items-center justify-center rounded-full '>
                    CONTACT SALES
                </button>
            </div>
        </div>

        {/* the main part */}
        <div className=' mx-auto mt-20 flex-col items-center justify-center'>

            {/* Different tabs  */}
            <div className='flex items-center justify-center gap-2 flex-wrap'>
                {
                    fucnt.map((item, index) => (
                        <button 
                        onClick={() => setActive(index)}
                        key={index} 
                        className ={active === index ? 'uppercase px-4 py-2 flex  bg-gray-100 text-sm font-bold items-center justify-center rounded-xl border border-slate-200 hover:border-black' 
                        : 
                        'uppercase px-4 py-2 flex text-gray-500 text-sm font-bold items-center justify-center rounded-xl border border-slate-200 hover:border-black'}>
                            <AudioLines className='mr-2' size={16}/>
                            {item}
                        </button>
                    ))
                }
            </div>

            {/* the text area and voices */}
            {/* the powered by and sign up */}
            {/* the text area and voices */}
            <div className='w-3/4 h-[500px] relative mx-auto p-2 mt-5 rounded-3xl flex flex-col items-center  gap-y-4'>
                <img src={bgtext} className='w-full h-full absolute opacity-60 rounded-3xl top-0 -z-50' alt='bgtext'>
                </img>
                <div className='w-full h-[90%] bg-white flex flex-col items-center rounded-3xl'>
                    {/* the text area */}
                    <div className='w-full flex items-center justify-between border-b-2 h-[60%] p-2 rounded-3xl'>
                        <textarea 
                        className='w-full h-full bg-transparent p-4 text-xl font-semibold outline-none resize-none'
                        placeholder='Type your text here...'
                        onChange={(e) => setText(e.target.value)}
                        value={text}
                        ></textarea>
                        
                    </div>

                    {/* the voices parts */}
                    <div className='w-full h-[25%]  gap-x-4 py-2 gap-y-2 px-8 flex flex-wrap overflow-y-auto'>
                        {
                            voices.map((item, index) => (
                                <button key={index} className='px-3 py-2 flex  text-sm font-bold items-center justify-center rounded-xl border border-slate-200'>
                                    <img className='w-4 h-4 rounded-full mr-2' src={image}></img>
                                    <p className='font-bold text-xs'>{item[0]} | {item[1]}</p>
                                </button>
                            ))
                        }
                    </div>
                    <AudioPlay play={play} setPlay = {setPlay}/>
                    {/* the bottom part FUNCTIONALITIES */}
                    <div className='w-full h-[18%] flex items-center justify-between px-8'>
                        
                        <LanguageDropdown setPlay = {setPlay}/>
                        <div className='flex items-center justify-center space-x-4'>
                            <button 
                            onClick={() => setPlay(!play)}
                            className='bg-slate-900 px-4 py-2 flex text-white font-bold items-center justify-center rounded-full '>
                                {play ? "PAUSE" : "PLAY"}
                            </button>
                            <button className='hover:bg-slate-200 px-3 py-3 flex text-sm font-bold items-center justify-center rounded-full '>
                                <Download size={20}/>
                            </button>
                        </div>
                    </div>
                </div>
                {/* the powered by */}
                <div>
                    <p className=' font-bold' >{"Powered by Eleven v3 (alpha)"}</p>
                </div>
            </div>
            <div className='w-full flex items-center justify-center space-x-4 mt-5 mb-40'>
                <p className='uppercase font-bold'>Experience the full Audio AI platform</p>
                <button className='bg-slate-900 px-4 py-2 flex text-white font-bold items-center justify-center rounded-full '>
                    SIGN UP
                </button>
            </div>
        </div>
    </div>
  )
}

export default Dashboard
