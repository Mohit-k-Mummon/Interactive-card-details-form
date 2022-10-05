// VARIABLES

// States
const regularState = document.querySelector('.block__form-container');
const thankyou = document.querySelector('.thankyou');

// Inputs
const cardholderInput = document.getElementById('cardholder-input');
const cardNumberInput = document.getElementById('card-number-input');
const cardMMInput = document.getElementById('mm-input');
const cardYYInput = document.getElementById('yy-input');
const cardCvcInput = document.getElementById('cvc-input');

// Card Image TextContent

const cardNumber = document.getElementById('card-number');
const cardName = document.getElementById('card-name');
const cardMM = document.getElementById('card-mm');
const cardYY = document.getElementById('card-yy');
const cardCvc = document.getElementById('card-cvc');

// Button and Form
const btnConfirm = document.getElementById('btn-confirm');
const btnContinue = document.getElementById('btn-continue');
const form = document.querySelector('.form');

// Error Messages
const nameError = document.getElementById('name-error');
const numberError = document.getElementById('number-error');
const expirError = document.getElementById('expir-error');
const cvcError = document.getElementById('cvc-error');

// EventListeners for live card data
cardholderInput.addEventListener('input', () => {
	cardName.textContent = 'Jane appleseed';
	if (cardholderInput.value.length > 0) {
		cardName.textContent = cardholderInput.value;
	}
});
cardNumberInput.addEventListener('keyup', () => {
	cardNumber.textContent = '0000 0000 0000 0000';
	if (cardNumberInput.value.length > 0) {
		cardNumber.textContent = cardNumberInput.value;
	}
});

cardNumberInput.addEventListener('input', e => {
	e.target.value = e.target.value = e.target.value
		.replace(/[^\dA-Z]/g, '')
		// ^ replaces spaces with nothing
		.replace(/(.{4})/g, '$1 ')
		// ^ groups four numbers then adds a space at end
		.trim();
});

cardMMInput.addEventListener('keyup', () => {
	cardMM.textContent = '00';
	if (cardMMInput.value.length > 0) {
		cardMM.textContent = cardMMInput.value;
	}
});

cardYYInput.addEventListener('keyup', () => {
	cardYY.textContent = '00';
	if (cardYYInput.value.length > 0) {
		cardYY.textContent = cardYYInput.value;
	}
});

cardCvcInput.addEventListener('keyup', () => {
	cardCvc.textContent = '000';
	if (cardCvcInput.value.length > 0) {
		cardCvc.textContent = cardCvcInput.value;
	}
});

// Validation Functions
form.addEventListener('submit', validate);
btnConfirm.addEventListener('click', validate);

function validate(e) {
	e.preventDefault();

	let cardholder = cardholderInput.value;
	let number = cardNumberInput.value;
	let month = cardMMInput.value;
	let year = cardYYInput.value;
	let cvc = cardCvcInput.value;

	let count = 4;

	if (!nameValidate(cardholder)) {
		nameError.style.visibility = 'visible';
		cardholderInput.style.border = '2px solid var(--Red)';
		count--;
	} else {
		nameError.style.visibility = 'hidden';
		cardholderInput.style.border = '1px solid var(--Dark-grayish-violet)';
	}

	if (!numberValidate(number)) {
		numberError.style.visibility = 'visible';
		cardNumberInput.style.border = '2px solid var(--Red)';
		count--;
	} else {
		numberError.style.visibility = 'hidden';
		cardNumberInput.style.border = '1px solid var(--Dark-grayish-violet)';
	}

	if (!expirationValidate(month) || month > 12) {
		expirError.style.visibility = 'visible';
		cardMMInput.style.border = '2px solid var(--Red)';
		count--;
	} else {
		cardMMInput.style.border = '1px solid var(--Dark-grayish-violet)';
		expirError.style.visibility = 'hidden';
	}

	if (!expirationValidate(year)) {
		expirError.style.visibility = 'visible';
		cardYYInput.style.border = '2px solid var(--Red)';
		count--;
	} else {
		cardYYInput.style.border = '1px solid var(--Dark-grayish-violet)';
	}

	if (!cvcValidate(cvc)) {
		cvcError.style.visibility = 'visible';
		cardCvcInput.style.border = '2px solid var(--Red)';
		count--;
	} else {
		cvcError.style.visibility = 'hidden';
		cardCvcInput.style.border = '1px solid var(--Dark-grayish-violet)';
	}

	if (count === 4) {
		regularState.style.display = 'none';
		thankyou.style.display = 'flex';
		cardholderInput.value = '';
		cardNumberInput.value = '';
		cardMMInput.value = '';
		cardYYInput.value = '';
		cardCvcInput.value = '';
	}
}

btnContinue.addEventListener('click', () => {
	regularState.style.display = 'flex';
	thankyou.style.display = 'none';
});

// Regex's
function nameValidate(input) {
	return /^[A-Z][a-z]+\s[A-Z][a-z]+$/gim.test(input);
}

function numberValidate(input) {
	return /(\d{4}[ ]?){4}/gm.test(input);
}

function expirationValidate(input) {
	return /\b\d{2}\b/gm.test(input);
}

function cvcValidate(input) {
	return /\b\d{3}\b/gm.test(input);
}

function reset() {
	cardholderInput.textContent = '';
}
