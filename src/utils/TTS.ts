import { useState, useEffect } from 'react';

export interface ApiResponse {
   // Define the structure of the API response here
   // Example: assuming the response is an audio file in binary format
   // You can define the response type according to your API's response
   audio: Blob;
}

export interface ApiError {
   message: string;
}

const useApi = (url: string, requestBody: any, headers: any) => {
   const [data, setData] = useState<ApiResponse | null>(null);
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState<ApiError | null>(null);

   useEffect(() => {
      const fetchData = async () => {
         setIsLoading(true);

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
            setData({ audio: responseData });
            console.log(responseData);
         } catch (error) {
            setError({ message: (error as ApiError).message });
         } finally {
            setIsLoading(false);
         }
      };

      fetchData();
   }, [url, requestBody, headers]);

   return { data, isLoading, error };
};

export default useApi;
