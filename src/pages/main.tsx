// @ts-ignore
'use client'
import { fetchVoices } from '@/utils/fetchVoices';
import { identifyCharacters } from '@/utils/identifyCharacters';
import { parsePassage } from '@/utils/parsePassage';
import useApi, { ApiError, ApiResponse } from '@/utils/TTS';
import React, { useState, ChangeEvent, useEffect } from 'react';

const Main = () => {
   const [audioData, setAudioData] = useState<ApiResponse | null>(null);
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState<ApiError | null>(null);
   const [passage, setPassage] = useState([]);
   const [voices, setVoices] = useState([]);
   const [currentVoice, setCurrentVoice] = useState("21m00Tcm4TlvDq8ikWAM");
   const [characters, setCharacters] = useState<{ [key: string]: string }[]>([{ "Voice": "21m00Tcm4TlvDq8ikWAM" }]);
   /** const [characters, setCharacters] = useState<string[][]>([["Voice","21m00Tcm4TlvDq8ikWAM"]]);
    setCharacters(p => { 
            
          const nstate = [...p];
          const voiceID = 
       nstate[_i][1] = 
    })
     */
   const apiKey = process.env.NEXT_PUBLIC_elevenlabs_api_key;
   const apiKey2 = process.env.NEXT_PUBLIC_elevenlabs_api_key2;

   useEffect(() => {
      const fetchData = async () => {
         try {
            let voices = await fetchVoices(apiKey2!);
            // Do something with the fetched voices data
            voices = voices.voices.map((voice: any) => ({
               voiceID: voice.voice_id,
               name: voice.name
            }));
            setVoices(voices);
         } catch (error) {
            console.error('Error:', error);
         }
      };

      fetchData();
   }, []);

   const fetchAudio = async (apiKey: string, voiceID: string, text: string) => {
      const url = 'https://api.elevenlabs.io/v1/text-to-speech/' + voiceID;
      setIsLoading(true);
      const headers = {
         'accept': 'audio/mpeg',
         'xi-api-key': apiKey,
         'Content-Type': 'application/json',
      };
      const requestBody = {
         text: text,
         model_id: 'eleven_monolingual_v1',
         voice_settings: {
            stability: 0.8,
            similarity_boost: 0.81,
         },
      };

      try {
         const response = await fetch(url, {
            method: 'POST',
            headers,
            body: JSON.stringify(requestBody),
         });

         if (!response.ok) {
            throw new Error('Request failed');
         }

         const responseData = await response.blob();
         setAudioData({ audio: responseData });
         console.log(responseData);
      } catch (error) {
         setError({ message: (error as ApiError).message });
      } finally {
         setIsLoading(false);
      }
   };

   // Declare a variable to store the timeout ID
   let timeoutId: any;
   const handleTextAreaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
         const parsedPassage = parsePassage(event.target.value);
         // @ts-ignore
         setPassage(parsedPassage);

         // setCharacters(identifyCharacters(passage));
      }, 400); // Debounce for 1 second (1000 milliseconds)
   };


   const handleSubmit = () => {
      // Handle form submission logic here
      if (passage.length < 2) {
         // @ts-ignore
         fetchAudio(apiKey2!, currentVoice, passage[0].text);
         // fetchAudio(apiKey2!, characters[0]['Voice'], passage[0].text);
      }
      else {

      }

   };

   // useEffect(() => {
   //    console.log(currentVoice);
   // }, [currentVoice]);

   const updateCharacters = (index: number, name: string) => {
      const i = 1;
      const n = 'adele';
      // voices = [{name:hi,voiceid:9},{name:ok,voiceid:1}]
      // characters = [{don:9},{}] , [[don,9],[potter,1]]
      const newArray = [...characters];
      const charName = Object.keys(characters[index])[0];

   }

   return (
      <div className='_container p-10 gap-5 w-full h-full flex flex-col justify-center items-center'>
         <h1 className='text-4xl '>The Narrator</h1>
         <div className='gap-[100px] w-full h-full flex flex-row justify-center'>
            <textarea className="block input h-[500px] w-[500px]" onChange={handleTextAreaChange} />
            <div className='flex flex-col gap-5'>
               <div className='characters min-h-100'>
                  <h1 className='block mb-5 font-bold'>Character voices:</h1>
                  <div className='flex flex-column gap-5'>
                     {characters.map((character, _i) => {
                        const characterName = Object.keys(character)[0];
                        console.log(characters, voices);
                        return (
                           <div key={_i} className='flex flex-row gap-2 justify-between'>
                              <label htmlFor={"voice_" + _i}>{characterName}</label>
                              {/* @ts-ignore */}
                              <select id={"voice_" + _i} className='dropdown' value={characters[characterName]}
                                 onChange={(e) => setCurrentVoice(e.target.value)}
                              // onChange={(e) => updateCharacters(_i, characterName)}
                              /**
                               * updateCharacters(_i,)
                               */
                              >
                                 {voices.map((voice, index) => (
                                    // @ts-ignore
                                    <option key={index} value={voice.voiceID}>
                                       {// @ts-ignore
                                          voice.name}
                                    </option>
                                 ))}
                              </select>
                           </div>)
                     }
                     )}
                  </div>
               </div>
               <button className="btn block" onClick={handleSubmit}>Get Audio</button>
               {
                  audioData !== null ? (
                     <div className='_audio flex flex-col gap-3 justify-center items-center'>
                        <audio controls src={URL.createObjectURL(audioData?.audio)}></audio>
                        <button
                           onClick={() => {
                              const link = document.createElement('a');
                              link.href = URL.createObjectURL(audioData?.audio);
                              link.download = 'audiobook.mp3';
                              link.click();
                           }}
                           className="btn block"
                        >
                           {isLoading ? "Loading" : "Download"}
                        </button>
                     </div>
                  ) : (
                     <div className='_audio flex flex-col gap-3 justify-center items-center'>
                        <audio controls></audio>
                        <button
                           disabled
                           onClick={() => {
                              const link = document.createElement('a');
                              link.href = "";
                              link.download = 'audiobook.mp3';
                              link.click();
                           }}
                           className="btn block"
                        >
                           Download
                        </button>
                     </div>
                  )
               }


            </div>

         </div >
      </div >
   );
};

export default Main;



{/* <h2>Characters' voices:</h2>
            <ul>
               {characters!.map((character, index) => (
                  <li key={index}>{character}</li>
               ))}
            </ul>



"Space," it says, "is big. Really big. You just won't believe how vastly, hugely, mind-bogglingly big it is. I mean, you may think it's a long way down the road to the chemist, but that's just peanuts to space, listen. And for total lack of a better word, huge swathes of it is completely and utterly empty. Vast stretches of nothingness, punctuated by tiny specks of matter, galaxies, stars, planets, and the occasional piece of space junk. It's mind-boggling, really. You can't wrap your head around the scale of it. It's like trying to comprehend infinity while standing at the edge of a bottomless pit. It just goes on and on and on, and it's both fascinating and terrifying at the same time."



            */}
