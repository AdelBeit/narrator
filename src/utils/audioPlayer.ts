// Play audio files in sequence
export const playAudioBook = async (audioFiles: string[]) => {
   const audioContext = new AudioContext();
   let currentIndex = 0;
   const loadAudio = async (url: string) => {
      const response = await fetch(url);
      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
      return audioBuffer;
   };
   const audioBuffers = await Promise.all(audioFiles.map(url => loadAudio(url)));
   const audioSources = audioBuffers.map(buffer => {
      const source = audioContext.createBufferSource();
      source.buffer = buffer;
      source.connect(audioContext.destination);
      return source;
   });

   const playNext = () => {
      const source = audioSources[currentIndex];
      source.start();
      source.onended = () => {
         currentIndex++;
         if (currentIndex < audioSources.length) {
            setTimeout(() => {
               playNext();
            }, 1000); // Delay of 1000 milliseconds (1 second)
         }
      };
   };

   playNext();
};

