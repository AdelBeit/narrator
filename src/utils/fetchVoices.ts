export const fetchVoices = async (apiKey: string) => {
   const url = 'https://api.elevenlabs.io/v1/voices';

   try {
      const response = await fetch(url, {
         method: 'GET',
         headers: {
            'Accept': 'application/json',
            'xi-api-key': apiKey
         }
      });

      if (!response.ok) {
         throw new Error('Request failed');
      }

      const data = await response.json();
      return data;
   } catch (error) {
      console.error('Error:', error);
      throw error;
   }
};
