const resultEl = document.getElementById("result");
const lengthEl = document.getElementById("length");
const uppercaseEl = document.getElementById("uppercase");
const lowercaseEl = document.getElementById("lowercase");
const numbersEl = document.getElementById("numbers");
const symbolsEl = document.getElementById("symbols");
const extendedSymbolsEl = document.getElementById("extendedSymbols");
const generateEl = document.getElementById("generate");
const clipboard = document.getElementById("clipboard");

const randomFunction = {
    lowercase: getRandomLower,
    uppercase: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol,
    extendedSymbol: getRandomExtendedSymbol
}
// console.log(randomFunction.lowercase);

function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
    return +String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomExtendedSymbol() {
    return String.fromCharCode(Math.floor(Math.random() * 6) + 134);
}

function getRandomSymbol() {
    const symbols = `!@#$%^&*(){}[]=<>/,.`;
    // console.log(typeof symbols);
    // console.log(symbols[1]);
    return symbols[Math.floor(Math.random() * symbols.length)];
}

function generatePassword(lowercase, uppercase, number, symbol, extendedSymbol, length) {
    let generatedPassword = "";

    const typesCount = lowercase + uppercase + number + symbol + extendedSymbol;
    // console.log(typesCount);
    if(typesCount === 0) {return ""; };

    const typesArr = [{lowercase}, {uppercase}, {number}, {symbol}, {extendedSymbol}].filter(item => {
        return Object.values(item)[0];
    });
    // console.log([{lowercase}, {uppercase}, {number}, {symbol}, {extendedSymbol}]);
    // ya da
    // const typesArr = [{lowercase}, {uppercase}, {number}, {symbol}, {extendedSymbol}].filter(item => Object.values(item)[0]);
    // console.log(typesArr);
    for (let i = 0; i < length; i+=typesCount) { 
        typesArr.forEach(type => {
            const funcName = Object.keys(type)[0];
            //randomFunctionlowercase()
            generatedPassword += randomFunction[funcName]();
        });
        // console.log(i);
    }
    const finalPassword = generatedPassword.slice(0, length);
    // console.log(generatedPassword);
    // console.log(finalPassword);
    return finalPassword;
}


generate.addEventListener("click", () => {
    const length = +lengthEl.value;
    const hasLower = lowercaseEl.checked;
    const hasUpper = uppercaseEl.checked;
    const hasNumber = numbersEl.checked;
    const hasSymbol = symbolsEl.checked;
    const hasExtendedSymbol = extendedSymbolsEl.checked;

    resultEl.innerText =  generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, hasExtendedSymbol, length);
    // console.log(hasLower);
    // console.log(resultEl.innerText);
});


clipboard.addEventListener("click", () => {
    const textarea = document.createElement("textarea");
    const password = resultEl.innerText;

    if(!password) {
        // console.log("no password");
        return;
    }

    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    textarea.remove(); 
    alert(`Password copied to clipboard`);
    // console.log(password);
});