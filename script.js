const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("[data-lenghtNumber]");
const passwordDisplay = document.querySelector('[data-passDisplay]');
const copyBtn = document.querySelector('.copy-btn');
const copyMsg = document.querySelector('[ copy-Msg]');



const upperCase = document.querySelector('.uppercase');
const lowerCase = document.querySelector('.lowercase');
const numberLetter = document.querySelector('.number');
const symbolLetter = document.querySelector('.symbol');


const checkBoxAll = document.querySelectorAll('input[type=checkbox]');
console.log(checkBoxAll);
const Indicator = document.querySelector('[data-indicator]');
const generateBtn = document.getElementById('generate-btn');


// console.log("hello")
// console.log(lengthdisplay .textContent);
let checkCount = 1;

let password = "";
let passwordLength = 10;

setIndicator('#ccc')
// lengthDisplay.innerText = passwordLength;
// set the initial color of indicator to gray


let Str = "!@#$%^&*(){}[?]|~+-*/";
upperCase.checked = true;


//set password length

function handleSlider() {
    inputSlider.value = passwordLength;
    lengthDisplay.innerText = inputSlider.value;
    // Or kuch kaarna chaiye?

    const min = inputSlider.min;
    const max = inputSlider.max;
    inputSlider.style.backgroundSize = ( (passwordLength - min)*100/(max - min)) + "% 100%"

}
handleSlider()


function setIndicator(color) {
    
    Indicator.style.backgroundColor = color;
    //shaddow
    Indicator.style.boxShadow =`0px 0px 12px 1px ${color}`;
    
}


function getRndInteger(min, max) {
    return (Math.floor(Math.random() * (max - min)) + min);

}
function getRndNumber() {
    return getRndInteger(0, 9);
}
function getRndLowercase() {
    return String.fromCharCode(getRndInteger(97, 123));
}
function getRndUppercase() {
    return String.fromCharCode(getRndInteger(65, 91));
}

function generateSymbols() {
    let index = getRndInteger(0, Str.length);
    return Str.charAt(index);
}

function handeleCheckbox() {
    checkCount = 0;
    checkBoxAll.forEach((checkbox) => {
        if (checkbox.checked) {
            checkCount++;

        }
    })

    //Special condition
    if (passwordLength < checkCount) {
        passwordLength = checkCount;
        handleSlider();
    }
}
console.log(checkBoxAll)


checkBoxAll.forEach((checkbox) => {
    checkbox.addEventListener("change", handeleCheckbox)
})


function setStrength() {
    let hasLowercase = false;
    let hasUppercase = false;
    let hasSysbol = false;
    let hasNumber = false;

    if (lowerCase.checked) hasLowercase = true;
    if (upperCase.checked) hasUppercase = true;
    if (symbolLetter.checked) hasSysbol = true;
    if (numberLetter.checked) hasNumber = true;

    if (hasUppercase && hasLowercase && (hasNumber || hasSysbol) && passwordLength >= 8) {
        setIndicator("#0f0");

    } else if ((hasLowercase || hasUppercase) && (hasNumber || hasSysbol) && passwordLength >= 6) {
        setIndicator("#ff0");
    } else {
        setIndicator('#f00');
    }
}


async function copyContent() {
    try {
        await navigator.clipboard.writeText(passwordDisplay.value)

        copyMsg.innerText = "Copied";
        console.log('Text copied to clipboard');


    }
    catch (err) {
        copyMsg.innerText = "Failed";
        console.error('Failed to copy: ', err);
    };



    copyMsg.classList.add("active");
 
    setTimeout( () => {
        copyMsg.classList.remove("active");
    },2000);


}

inputSlider.addEventListener("input", (e) => {
    passwordLength = e.target.value;
    handleSlider();
})

copyBtn.addEventListener("click", () => {
    if (passwordDisplay.value ) {
        copyContent()
    }

})

function shuffledPassword(array) {

    // Fisher-Yates Sorting Algorithm
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    // let str =" ";
    // array.forEach(element => {
    //     str+=element;
    // });
    // return str;
    return array.join("");


}

generateBtn.addEventListener("click", () => {

    //number of checkcount
    if (checkCount <= 0) {
        return;
    }

    console.log("start jurney")
    //  let start to crate password
    if (passwordLength < checkCount) {
        passwordLength = checkCount;
        handleSlider();

    }
    // remove old password
    password = "";
    //  if(upperCase.checked){
    //     password += getRndUppercase();
    //  }
    //  if(lowerCase.checked){
    //     password += getRndLowercase();
    //  }
    //  if(numberLetter.checked){
    //     password += getRndNumber();
    //  }
    //  if(symbolLetter.checked){
    //     password += generateSymbols();
    //  }

    let functionArray = [];


    if (upperCase.checked) {
        functionArray.push(getRndUppercase);
    }
    if (lowerCase.checked) {
        functionArray.push(getRndLowercase);
    }
    if (numberLetter.checked) {
        functionArray.push(getRndNumber);
    }
    if (symbolLetter.checked) {
        functionArray.push(generateSymbols);
    }

    // compulsary addition  

    functionArray.forEach(element => {
        password += element();

    });



    // for( let i=0;i<passwordLength;i++){
    //     let randIndex = getRndInteger(0,functionArray.length);
    //     password+= functionArray[randIndex]();
    // }


    //remaining addition
    for (let i = 0; i < passwordLength - functionArray.length; i++) {
        let randIndex = getRndInteger(0, functionArray.length);
        password += functionArray[randIndex]();
    }


    // suffling
    // let arraypass = Array.from(password);
    password = shuffledPassword(Array.from(password));

    passwordDisplay.value = password;
    setStrength();


})
