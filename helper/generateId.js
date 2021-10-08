const letter = "abcdefghijklmnopqrstuvwxyz";
const allCharacters = `${letter}1234567890123456789123456789{letter.toUpperCase()}`;
// then i will split the allCharacters into an array like so
const allCharactersInArray = allCharacters.split("");

const idLength = 16;

function randomCharacter() {
    return allCharactersInArray[
        Math.floor(Math.random() * allCharactersInArray.length)
    ];
}

module.exports = () => {
    const generateId = [];
    for (let i = 0; i < idLength; i++) {
        generateId.push(randomCharacter());
    }

    return generateId.join("");
};
