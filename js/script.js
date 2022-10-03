

// reset all form inputs on page load
const form = document.getElementById("form");
form.reset();


// focus on Name field on pageLoad
const nameInput = document.getElementById("name");
nameInput.focus();

// Job role extra information only displayed when other selection chosen
const jobTitleInput = document.getElementById("title");
const jobTitleExtraInput = document.getElementById("other-job-role");

jobTitleExtraInput.style.display = "none";

jobTitleInput.addEventListener("change", () => {
  jobTitleInput.value === "other"
    ? (jobTitleExtraInput.style.display = "")
    : (jobTitleExtraInput.style.display = "none");
});

// T shirt extra   information obtion  only show once selection is chosen 
const tShirtSizeInput = document.getElementById("shirt-sizes");
const tShirtDesignInput = document.getElementById("design");
const tShirtColorInput = document.getElementById("color");
const tShirtColorSection = document.getElementById("shirt-colors");

tShirtColorSection.style.display = "none";

tShirtDesignInput.addEventListener("change", () => {
  tShirtColorSection.style.display = "";
  tShirtColorInput.selectedIndex = 0;
  for (let i = 0; i < tShirtColorInput.options.length; i++) {
    tShirtDesignInput.value === tShirtColorInput.options[i].dataset.theme
      ? (tShirtColorInput.options[i].hidden = false)
      : (tShirtColorInput.options[i].hidden = true);
  }
});

/* resister activities section tallies cost of activities */
const activitiesField = document.getElementById("activities");
const activitiesCostDisplay = document.getElementById("activities-cost");
const activitiesCheckbox = document.querySelectorAll("input[type=checkbox]");

let activitiesCost = 0;

// if statement to check each key input
// if valid remove not-valid, add valid class and hide hint
// if invalid add not-valid class, remove valid and show hint
activitiesField.addEventListener("change", (e) => {
  if (e.target.checked) {
    activitiesCost += parseInt(e.target.dataset.cost);
    // loop over activities to disable any conflicts that are not targeted
    activitiesCheckbox.forEach((activity) => {
      if (
        e.target.dataset.dayAndTime === activity.dataset.dayAndTime &&
        activity !== e.target
      ) {
        activity.parentElement.classList.add("disabled");
        activity.disabled = true;
      }
    });
  } else if (!e.target.checked) {
    activitiesCost -= parseInt(e.target.dataset.cost);
    // loop over activities to re enable any conflicts
    activitiesCheckbox.forEach((activity) => {
      if (e.target.dataset.dayAndTime === activity.dataset.dayAndTime) {
        activity.parentElement.classList.remove("disabled");
        activity.disabled = false;
      }
    });
  }

  activitiesCostDisplay.innerHTML = `Total: $${activitiesCost}`;
});

// add focus on register for activities section
activitiesCheckbox.forEach((checkbox) =>
  checkbox.addEventListener("focus", () => {
    checkbox.parentElement.classList.add("focus");
  })
);

activitiesCheckbox.forEach((checkbox) =>
  checkbox.addEventListener("blur", () => {
    checkbox.parentElement.classList.remove("focus");
  })
);

//  payment options based on users selection 
const paymentMethodInput = document.getElementById("payment");
const paymentCreditCard = document.getElementById("credit-card");
const paymentPayPal = document.getElementById("paypal");
const paymentBitCoin = document.getElementById("bitcoin");

paymentMethodInput.options[1].selected = true;
paymentPayPal.style.display = "none";
paymentBitCoin.style.display = "none";

paymentMethodInput.addEventListener("change", () => {
  // start by removing not valid on parent when changing option
  paymentMethodInput.parentElement.classList.remove("not-valid");
  if (paymentMethodInput.value === "credit-card") {
    paymentCreditCard.style.display = "";
    paymentPayPal.style.display = "none";
    paymentBitCoin.style.display = "none";
  } else if (paymentMethodInput.value === "bitcoin") {
    paymentCreditCard.style.display = "none";
    paymentPayPal.style.display = "none";
    paymentBitCoin.style.display = "";
  } else if (paymentMethodInput.value === "paypal") {
    paymentCreditCard.style.display = "none";
    paymentPayPal.style.display = "";
    paymentBitCoin.style.display = "none";
  }
});
// RegEx validation
const nameRegex = (/^[a-zA-Z]+ ?[a-zA-Z]*? ?[a-zA-Z]*?$/);
const emailRegex = (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
const cardRegex =  (/^\d{13,16}$/);
const zipRegex = (/^\d{5}$/);
const cvvRegex = /^[1-9]{3}$/;

// functions for validation 
// name validation
const nameValidate = () => { 
  if (nameRegex.test(nameInput.value)) {
    nameInput.parentElement.classList.add("valid");
    nameInput.parentElement.classList.remove("not-valid");
    nameInput.parentElement.lastElementChild.style.display = "";
    return true;
  } else {
    nameInput.parentElement.classList.add("not-valid");
    nameInput.parentElement.classList.remove("valid");
    nameInput.parentElement.lastElementChild.style.display = "block";
    return false;
  }
};

// validation for name field on keuyp with debounce to not fire too quick
nameInput.addEventListener("keyup", (nameValidate));

// email validation
const emailInput = document.querySelector("#email");

const emailValidate = () => { 
  
  if (emailInput.value === "") {
    emailInput.parentElement.lastElementChild.innerText =
      "Email field cannot be blank";
    emailInput.parentElement.classList.add("not-valid");
    emailInput.parentElement.classList.remove("valid");
    emailInput.parentElement.lastElementChild.style.display = "block";
    return false;
  } else if (emailRegex.test(emailInput.value)) {
    emailInput.parentElement.classList.add("valid");
    emailInput.parentElement.classList.remove("not-valid");
    emailInput.parentElement.lastElementChild.style.display = "";
    return true;
  } else {
    emailInput.parentElement.classList.add("not-valid");
    emailInput.parentElement.classList.remove("valid");
    emailInput.parentElement.lastElementChild.innerText =
      "Email address must be formatted correctly";
    emailInput.parentElement.lastElementChild.style.display = "block";
    return false;
  }
  return;
};

// validation on keyup for email section on keyup, but using debounce to not fire all the time
emailInput.addEventListener("keyup", (emailValidate));

// function to make sure > 0 activities checked
const activitiesValidate = () => {
  if (activitiesCost > 0) {
    activitiesField.classList.add("valid");
    activitiesField.classList.remove("not-valid");
    activitiesField.lastElementChild.style.display = "";
    return true;
  } else {
    activitiesField.classList.add("not-valid");
    activitiesField.classList.remove("valid");
    activitiesField.lastElementChild.style.display = "block";
    return false;
  }
};
// run validate when user changes form
activitiesField.addEventListener("change", activitiesValidate);

// fucntion to validate credit card info if active

const cardNumInput = document.getElementById("cc-num");
const zipInput = document.getElementById("zip");
const cvvInput = document.getElementById("cvv");

const cardNumValidate = (cardNum) => { 
  if (cardRegex.test(cardNum)) {
    cardNumInput.parentElement.classList.add("valid");
    cardNumInput.parentElement.classList.remove("not-valid");
    cardNumInput.parentElement.lastElementChild.style.display = "";
    return true;
  } else {
    cardNumInput.parentElement.classList.add("not-valid");
    cardNumInput.parentElement.classList.remove("valid");
    cardNumInput.parentElement.lastElementChild.style.display = "block";
    return false;
  }
};

//  zip valid
const zipValidate = (zip) => {  
  if (zipRegex.test(zip)) {
    zipInput.parentElement.classList.add("valid");
    zipInput.parentElement.classList.remove("not-valid");
    zipInput.parentElement.lastElementChild.style.display = "";
    return true;
  } else {
    zipInput.parentElement.classList.add("not-valid");
    zipInput.parentElement.classList.remove("valid");
    zipInput.parentElement.lastElementChild.style.display = "block";
    return false;
  }
};

//  cvv valid
const cvvValidate = (cvv) => { 
  if (cvvRegex.test(cvv)) {
    cvvInput.parentElement.classList.add("valid");
    cvvInput.parentElement.classList.remove("not-valid");
    cvvInput.parentElement.lastElementChild.style.display = "";
    return true;
  } else {
    cvvInput.parentElement.classList.add("not-valid");
    cvvInput.parentElement.classList.remove("valid");
    cvvInput.parentElement.lastElementChild.style.display = "block";
    return false;
  }
};

const paymentValidate = () => {
  if (paymentMethodInput.options[1].selected) {
    const isCvvValid = cvvValidate(cvvInput.value);
    const isZipValid = zipValidate(zipInput.value);
    const isCardNumValid = cardNumValidate(cardNumInput.value);
    return isCvvValid && isZipValid && isCardNumValid ? true : false;
  } else {
    return true
  }
};

// form submit handler 
form.addEventListener("submit", (e) => {
  // capture results of each test
  const isNameValid = nameValidate();
  const isEmailValid = emailValidate();
  const isActivitiesValid = activitiesValidate();
  const isPaymentValid = paymentValidate();

  // check if all valid, if valid sumbit, if not prevent default
  const isFormValid =
    isNameValid && isEmailValid && isActivitiesValid && isPaymentValid;
  if (isFormValid) {
    return;
  } else {
    e.preventDefault();
  }
});
