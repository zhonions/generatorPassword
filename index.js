document.addEventListener("DOMContentLoaded", function() {
    const passwordDisplay = document.querySelector("#password p");
    const lengthBar = document.querySelector("#lengthBar");
    const lengthDisplay = document.querySelector("#c");
    const uppercaseCheckbox = document.querySelector("#uppercase");
    const lowercaseCheckbox = document.querySelector("#lowercase");
    const numbersCheckbox = document.querySelector("#numbers");
    const symbolsCheckbox = document.querySelector("#symbols");
    const generateBtn = document.querySelector("#generateBtn");
    const copyBtn = document.querySelector("#copyBtn");
    const strengthLevel = document.querySelector("#strengthLevel");
  
    const uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+=-{}[]|:;<>,.?/";
  
    function updateLengthValue(value) {
      lengthDisplay.textContent = value;
    }
  
    function generatePassword() {
      let allowedChars = "";
      if (uppercaseCheckbox.checked) allowedChars += uppercaseLetters;
      if (lowercaseCheckbox.checked) allowedChars += lowercaseLetters;
      if (numbersCheckbox.checked) allowedChars += numbers;
      if (symbolsCheckbox.checked) allowedChars += symbols;
  
      let password = "";
      if (allowedChars.length === 0) {
        password = "N/A";
      } else {
        for (let i = 0; i < lengthBar.value; i++) {
          password += allowedChars[Math.floor(Math.random() * allowedChars.length)];
        }
      }
  
      passwordDisplay.innerText = password;
      updateStrengthBars();
    }
  
    function copyPassword() {
      const textarea = document.createElement("textarea");
      textarea.value = passwordDisplay.innerText;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }
  
    function updateStrengthBars() {
      const checkboxes = [
        uppercaseCheckbox,
        lowercaseCheckbox,
        numbersCheckbox,
        symbolsCheckbox,
      ];
      let checkedCount = checkboxes.filter((checkbox) => checkbox.checked).length;
  
      const strengthLevels = ["none", "low", "medium", "high", "very-high"];
      strengthLevel.innerText = strengthLevels[checkedCount].toUpperCase();
  
      const strengthBars = document.querySelectorAll(".strengthBar");
      strengthBars.forEach((bar, index) => {
        bar.className = 'strengthBar';
        if (index < checkedCount) {
          bar.classList.add('strengthBar-' + strengthLevels[checkedCount]);
        }
      });
    }
  
    lengthBar.addEventListener("input", () => updateLengthValue(lengthBar.value));
    generateBtn.addEventListener("click", generatePassword);
    copyBtn.addEventListener("click", copyPassword);
  
    updateLengthValue(lengthBar.value);
  });
  