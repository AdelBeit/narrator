export const identifyCharacters = (passage: string) => {
   const characterNames = passage.match(/(\w+):/g);
   const uniqueCharacters = new Set(characterNames);
   return Array.from(uniqueCharacters);
}   