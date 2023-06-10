export { };
// export const fetchAudio = async (voiceID: string) => {
//    const url = 'https://api.elevenlabs.io/v1/text-to-speech/21m00Tcm4TlvDq8ikWAM';
//    setIsLoading(true);

//    try {
//       const response = await fetch(url, {
//          method: 'POST',
//          headers,
//          body: JSON.stringify(requestBody),
//       });

//       if (!response.ok) {
//          throw new Error('Request failed');
//       }

//       const responseData = await response.blob();
//       setData({ audio: responseData });
//       console.log(responseData);
//    } catch (error) {
//       setError({ message: (error as ApiError).message });
//    } finally {
//       setIsLoading(false);
//    }
// };