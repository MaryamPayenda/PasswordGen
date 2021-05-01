// getting values from id
const CharachterAmountNumber = document.getElementById(
  "CharachterAmountNumber"
);
const includeNumbersElement = document.getElementById("includeNumbers");
const includeUppercaseElement = document.getElementById("includeUppercase");
const includeSymbolesElement = document.getElementById("includeSymboles");
const form = document.getElementById("passwordGeneratorForm");
const passwordDisplay = document.getElementById("passwordDisplay");

// charachter codes ranges
const UPPERCASE_CHAR_CODE = arrayFromLowToHigh(65, 90);
const LOWERCASE_CHAR_CODE = arrayFromLowToHigh(97, 122);
const NUMBER_CHAR_CODE = arrayFromLowToHigh(48, 57);
const SYMBOL_CHAR_CODE = arrayFromLowToHigh(33, 47)
  .concat(arrayFromLowToHigh(58, 64))
  .concat(arrayFromLowToHigh(91, 96))
  .concat(arrayFromLowToHigh(123, 126));

// when I change the range the number also changes adding events
CharachterAmountNumber.addEventListener("input", syncCharacterAmount);
// CharachterAmountRange.addEventListener("input", syncCharacterAmount);

function syncCharacterAmount(e) {
  const value = e.target.value;
  CharachterAmountNumber.value = value;
  CharachterAmountRange.value = value;
}

// here generating the password using charachter code
function generatePassword(
  characterAmount,
  includeUppercase,
  includeNumbers,
  includeSymboles
) {
  let charCodes = LOWERCASE_CHAR_CODE;
  if (includeUppercase) charCodes = charCodes.concat(UPPERCASE_CHAR_CODE);
  if (includeNumbers) charCodes = charCodes.concat(NUMBER_CHAR_CODE);
  if (includeSymboles) charCodes = charCodes.concat(SYMBOL_CHAR_CODE);
  const passwordCharacters = [];
  for (let i = 0; i < characterAmount; i++) {
    const characterCode =
      charCodes[Math.floor(Math.random() * charCodes.length)];
    passwordCharacters.push(String.fromCharCode(characterCode));
  }
  return passwordCharacters.join("");
}
// function to loop between all the charachter codes
function arrayFromLowToHigh(low, high) {
  const array = [];
  for (let i = low; i <= high; i++) {
    array.push(i);
  }
  return array;
}
// stoping the whole page from refreshing when I make change and generate the password in final

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const characterAmount = CharachterAmountNumber.value;
  const includeUppercase = includeUppercaseElement.checked;
  const includeNumbers = includeNumbersElement.checked;
  const includeSymboles = includeSymbolesElement.checked;
  const password = generatePassword(
    characterAmount,
    includeUppercase,
    includeNumbers,
    includeSymboles
  );
  passwordDisplay.innerText = password;
});
