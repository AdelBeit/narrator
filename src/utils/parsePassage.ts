export function parsePassage(passage: string) {
   const regex = /([^:]+):\s*"(.*?)"|([^:]+)/g;
   const matches = Array.from(passage.matchAll(regex));
   const result = [];

   for (let i = 0; i < matches.length; i++) {
      const match = matches[i];

      if (match[1] && match[2]) {
         result.push({
            character: match[1].trim(),
            text: match[2].trim()
         });
      } else if (match[3]) {
         result.push({
            text: match[3].trim()
         });
      }
   }

   return result;
}
