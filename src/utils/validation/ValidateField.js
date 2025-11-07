import validator from 'validator';

export const required = (value) => {
  if (value === undefined || value === null) {
    return false;
  }
  // if (!value.toString().trim().length) {
  if (!String(value).trim().length) {
    // We can return string or jsx as the 'error' prop for the validated Component
    return false;
  }
  if (typeof (value) !== 'string') {
    if (value === 0) {
      return false;
    }
  }
  return true;
};

export const requireArray = (value) => {
  if (value === undefined || value === null) {
    return false;
  }
  if (!value.length) {
    // We can return string or jsx as the 'error' prop for the validated Component
    return false;
  }
  if (value.length === 0) {

    // We can return string or jsx as the 'error' prop for the validated Component
    return false;
  }
  return true;
};

export const requireArrayGreterthenZero = (value) => {

  if (value === undefined || value === null) {
    return false;
  }
  if (!value.length) {
    // We can return string or jsx as the 'error' prop for the validated Component
    return false;
  }
  if (value.length === 1 && value[0] === 0) {
    // We can return string or jsx as the 'error' prop for the validated Component
    return false;
  }
  return true;
};

export const email = (value) => {
  // if (value === undefined || value === null || value.toString() === "") {
  if (value === undefined || value === null || String(value) === "") {
    return true;
  }
  if (!validator.isEmail(value)) {
    return false;
  }
  return true;
};

export const emailDomain = (value) => {
  let domain = `ABC@` + value;
  // if (domain === undefined || domain === null || domain.toString() === "") {
  if (domain === undefined || domain === null || String(domain) === "") {
    return true;
  }
  if (!validator.isEmail(domain)) {
    return false;
  }
  return true;
}

export const number = (value) => {
  const re = /^[0-9\b]+$/
  if (!re.test(value)) {
    return false;
  }
  else {
    return true;
  }
};

export const maxLength = (value, maxLen) => {
  // get the maxLength from component's props
  // if ((value.toString().trim().length <= maxLen)) {
  if ((String(value).trim().length <= maxLen)) {
    // Return jsx
    return true;
  }
  return false;
};

export const minLength = (value, minLen) => {
  // get the maxLength from component's props
  // if ((value.toString().trim().length >= minLen)) {
  if ((String(value).trim().length >= minLen)) {
    // Return jsx
    return true;
  }
  return false;
};

export const compare = (value, compareValue) => {
  // get the maxLength from component's props
  if (!(value === compareValue)) {
    // Return jsx
    return false;
  }
  return true;
};

export const distinct = (value, compareValue) => {
  // get the maxLength from component's props
  if (value !== "") {
    if (value === compareValue) {
      // Return jsx
      return false;
    }
  }
  return true;
};

export const maxProspects = (value, maxProspectsValue) => {
  // get the maxLength from component's props
  if ((value <= maxProspectsValue)) {
    // Return jsx
    return true;
  }
  return false;
};

export const minEndDate = (date, minEndDateValue) => {
  // get the maxLength from component's props
  if ((date >= minEndDateValue)) {
    // Return jsx
    return true;
  }
  return false;
};
export const maxSum = (sum, maxSumValue) => {
  // get the maxLength from component's props
  if ((sum <= maxSumValue)) {
    // Return jsx
    return true;
  }
  return false;
};

export const password = (value, props, components) => {
  // NOTE: Tricky place. The 'value' argument is always current component's value.
  // So in case we're 'changing' let's say 'password' component - we'll compare it's value with 'confirm' value.
  // But if we're changing 'confirm' component - the condition will always be true
  // If we need to always compare own values - replace 'value' with components.password[0].value and make some magic with error rendering.
  if (value !== components['confirm'][0].value) { // components['password'][0].value !== components['confirm'][0].value
    // 'confirm' - name of input
    // components['confirm'] - array of same-name components because of checkboxes and radios
    return <span className="error">Passwords are not equal.</span>
  }
};

export const uniqueIdentifier = (value) => {
  // if (value !== undefined && value !== null && value.toString().trim().length) {
  if (value !== undefined && value !== null && String(value).trim().length) {
    const pattern = new RegExp('^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$', 'i');
    if (!pattern.test(value)) {
      return false;
    }
  }
  return true;
};

export const isvalidPassword = (value) => {
  // if (value !== undefined && value !== null && value.toString().trim().length) {
  if (value !== undefined && value !== null && String(value).trim().length) {
    const pattern = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    if (!pattern.test(value)) {
      return false;
    }
  }
  return true;
}

export const isValidPasswordAdminAccount = (value) => {
  // if (value !== undefined && value !== null && value.toString().trim().length) {
  if (value !== undefined && value !== null && String(value).trim().length) {
    const pattern = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{10,})");
    if (!pattern.test(value)) {
      return false;
    }
  }
  return true;
}

export const maxNumber = (value, compareValue) => {
  // compare with the gives value
  if (value > compareValue) {
    // Return jsx
    return false;
  }
  return true;
};

export const minNumber = (value, compareValue) => {
  // compare with the gives value
  if (value < compareValue) {
    // Return jsx
    return false;
  }
  return true;
};

export const isValidateURL = (value) => {
  const pattern = new RegExp('^((https?:)?\\/\\/)?' + // protocol
    '(?:\\S+(?::\\S*)?@)?' + // authentication
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
    '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locater
  if (!pattern.test(value)) {
    return false;
  } else {
    return true;
  }
}

export const minDateCheck = (value) => {
  var minDate = new Date("1900-01-01");
  var selectedDate = new Date(value);
  if (selectedDate < minDate) {
    return false;
  }
  else {
    return true;
  }
}

export const maxDateCheck = (value) => {
  var maxDate = new Date();
  var selectedDate = new Date(value);
  if (selectedDate > maxDate) {
    return false;
  }
  else {
    return true;
  }
}

export const checkValidDateInput = (value) => {
  if (value !== undefined && value !== null && String(value).trim().length) {
    const dateFormatRegex = /^\d{4}(\/|-|\.)(0[1-9]|1[0-2])(\/|-|\.)\d{2}$/;
    if (!dateFormatRegex.test(value)) {
      return false;
    }
  }
  return true;
}