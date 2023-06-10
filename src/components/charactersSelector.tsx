export { };
// import React, { useState } from 'react';

// interface Character {
//    name: string;
//    voiceId: string;
// }

// export const CharactersSelector = ({ voices }: { voices: any }) => {
//    const [characters, setCharacters] = useState(voices);
//    const [characterMappings, setCharacterMappings] = useState<Record<string, string>>({});

//    // const handleInputChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
//    //    const { value } = event.target;
//    //    setCharacters(prevCharacters => {
//    //       const updatedCharacters = [...prevCharacters];
//    //       updatedCharacters[index] = { ...updatedCharacters[index], name: value };
//    //       return updatedCharacters;
//    //    });
//    // };

//    const handleDropdownChange = (index: number, event: React.ChangeEvent<HTMLSelectElement>) => {
//       const { value } = event.target;
//       setCharacters(prevCharacters => {
//          const updatedCharacters = [...prevCharacters];
//          updatedCharacters[index] = { ...updatedCharacters[index], voiceId: value };
//          return updatedCharacters;
//       });
//    };

//    const handleAddRow = () => {
//       setCharacters(prevCharacters => [...prevCharacters, { name: '', voiceId: '' }]);
//    };

//    const handleRemoveRow = (index: number) => {
//       setCharacters(prevCharacters => {
//          const updatedCharacters = [...prevCharacters];
//          updatedCharacters.splice(index, 1);
//          return updatedCharacters;
//       });
//    };

//    const handleSaveMappings = () => {
//       const mappings: Record<string, string> = {};
//       characters.forEach(character => {
//          if (character.name && character.voiceId) {
//             mappings[character.name] = character.voiceId;
//          }
//       });
//       setCharacterMappings(mappings);
//    };

//    return (
//       <div>
//          {characters.map((character, index) => (
//             <div key={index} className="row">
//                <input
//                   type="text"
//                   value={character.name}
//                   onChange={event => handleInputChange(index, event)}
//                   placeholder="Character Name"
//                />
//                <select
//                   value={character.voiceId}
//                   onChange={event => handleDropdownChange(index, event)}
//                >
//                   <option value="">Select a Voice ID</option>
//                   <option value="voiceId1">Voice ID 1</option>
//                   <option value="voiceId2">Voice ID 2</option>
//                   <option value="voiceId3">Voice ID 3</option>
//                </select>
//                <button onClick={() => handleRemoveRow(index)}>Remove</button>
//             </div>
//          ))}
//          <button onClick={handleAddRow}>Add Row</button>
//          <button onClick={handleSaveMappings}>Save Mappings</button>
//          <div>
//             <h3>Character Mappings:</h3>
//             <ul>
//                {Object.entries(characterMappings).map(([name, voiceId]) => (
//                   <li key={name}>
//                      {name}: {voiceId}
//                   </li>
//                ))}
//             </ul>
//          </div>
//       </div>
//    );
// };
