let password;
const main = () => {
	prepareDOMElements();
	prepareDOMEvents();
};

const prepareDOMElements = () => {
	toggles = document.querySelectorAll('.toggle-button'); //all toggle buttons on/off
	generateButton = document.querySelector('.btn-generate'); //password generate buttion
	copyButton = document.querySelector('.btn-copy'); //copy button
	passwordResult = document.querySelector('.password-input'); //generated password result input

	smallLetters = document.querySelector('.small-letters');
	bigLetters = document.querySelector('.big-letters');
	numbers = document.querySelector('.numbers');
	specialSigns = document.querySelector('.special-signs'); //button special signs on/off
	allowSigns = document.querySelector('.allow-signs'); //allow signs input
	passwordLenght = document.querySelector('.password-lenght'); //password lenght input
};
const prepareDOMEvents = () => {
	generateButton.addEventListener('click', generatePassword);
	passwordLenght.addEventListener('focusin', passwordLen);
	toggles.forEach((toggle) => {
		toggle.addEventListener('click', toggleAction);
	});
	specialSigns.addEventListener('click', specialSignsAllow);
	copyButton.addEventListener('click', copyBtn);
};

const toggleAction = (e) => {
	e.target.closest('div').classList.toggle('active');
};
const specialSignsAllow = () => {
	if (specialSigns.classList.contains('active')) {
		allowSigns.closest('li').style.display = 'flex';
	} else {
		allowSigns.closest('li').style.display = 'none';
	}
};
const passwordLen = () => {
	passwordLenght.value = '';
};

const copyBtn = () => {
	navigator.clipboard.writeText(passwordResult.value);
};
const generatePassword = () => {
	if (passwordLenght.value < 30 && passwordLenght.value > 5) {
		generateRandomPassword();
	}
};
const generateRandomPassword = () => {
	let charList = [];
	passwordResult.value = '';
	if (smallLetters.classList.contains('active') === true) {
		for (let i = 97; i <= 122; i++) {
			charList.push(String.fromCharCode(i));
		}
	}
	if (bigLetters.classList.contains('active') === true) {
		for (let i = 65; i <= 90; i++) {
			charList.push(String.fromCharCode(i));
		}
	}
	if (numbers.classList.contains('active') === true) {
		for (let i = 0; i < 10; i++) {
			charList.push(i.toString());
		}
	}
	if (
		specialSigns.classList.contains('active') === true &&
		allowSigns.value != ''
	) {
		for (let i = 0; i < allowSigns.value.length; i++) {
			charList.push(allowSigns.value.charAt(i));
		}
	}
	for (let i = 0; i < passwordLenght.value; i++) {
		let randomIndex = Math.floor(Math.random() * charList.length);
		if (charList[randomIndex] != undefined) {
			passwordResult.value += charList[randomIndex];
		}
	}
};

document.addEventListener('DOMContentLoaded', main);
