const contactForm = document.getElementById("contactform");

// Email validation
function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// Name without numbers and symbols
function isValidName(name) {
  const regex = /^[a-zA-Zа-яА-ЯёЁ\s]+$/;
  return regex.test(name);
}

// Error window
function showError(input, message) {
  const formControl = input.parentElement;
  const errorDisplay = formControl.querySelector('.error-message');

  errorDisplay.innerText = message;
  formControl.classList.add('error');
  formControl.classList.remove('success');
}

// Success window
function showSuccess(input) {
  const formControl = input.parentElement;
  const errorDisplay = formControl.querySelector('.error-message');

  errorDisplay.innerText = '';
  formControl.classList.remove('error');
  formControl.classList.add('success');
}

// Check required fields
function checkRequired(input) {
  if (input.value.trim() === '') {
    showError(input, `${input.labels[0].innerText} is required`);
    return false;
  } else {
    showSuccess(input);
    return true;
  }
}

// Email checker
function checkEmail(input) {
  if (!isValidEmail(input.value.trim())) {
    showError(input, 'Email is not valid');
    return false;
  } else {
    showSuccess(input);
    return true;
  }
}

// Name checker
function checkName(input) {
  if (!isValidName(input.value.trim())) {
    showError(input, 'Name can only contain letters and spaces');
    return false;
  } else {
    showSuccess(input);
    return true;
  }
}

// Form validation
function validateForm(event) {
  event.preventDefault();

  const name = contactForm.name;
  const email = contactForm.email;
  const message = contactForm.message;

  const isNameValid = checkRequired(name) && checkName(name);
  const isEmailValid = checkRequired(email) && checkEmail(email);
  const isMessageValid = checkRequired(message);

  if (isNameValid && isEmailValid && isMessageValid) {
    alert('Form submitted successfully!');
    contactForm.reset();
    document.querySelectorAll('.form-control').forEach(control => control.classList.remove('success', 'error'));
  }
}

contactForm.addEventListener('submit', validateForm);

contactForm.addEventListener('input', function(event) {
  const input = event.target;
  if (input.tagName.toLowerCase() === 'input' || input.tagName.toLowerCase() === 'textarea') {
    checkRequired(input);
    if (input.type === 'email') {
      checkEmail(input);
    }
    if (input.name === 'name') {
      checkName(input);
    }
  }
});


