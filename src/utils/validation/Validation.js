import {
  compare,
  email,
  number,
  required,
  uniqueIdentifier,
  isvalidPassword,
  maxLength,
  minLength,
  maxProspects,
  minEndDate,
  maxSum,
  distinct,
  requireArray,
  requireArrayGreterthenZero,
  minNumber,
  maxNumber,
  emailDomain,
  isValidateURL,
  isValidPasswordAdminAccount,
  minDateCheck,
  checkValidDateInput,
} from './ValidateField'

export function ValidateAll(state, rules) {
  let result = {
    isValid: true,
    error: {}
  }
  var keys = Object.keys(rules);
  let error = {};

  keys.forEach(key => {
    var fieldRules = rules[key]
    var validateResult = ValidateField(state[key], fieldRules, state);
    if (!validateResult.isvalid) {
      result.isValid = false;
      error[key] = validateResult.message;
    }
  });
  result.error = error;
  return result;
}

export function Validate(state, rules, key) {
  let result = {
    isValid: true,
    error: {}
  }

  let error = {};


  var fieldRules = rules[key]
  var validateResult = ValidateField(state[key], fieldRules, state);
  if (!validateResult.isvalid) {
    result.isValid = false;
    error[key] = validateResult.message;
  }

  result.error = error;
  return result;
}

export function ValidateField(value, fieldRules, state) {
  let result = { isvalid: true, message: '' };
  fieldRules.forEach(rule => {
    if (result.isvalid) {
      switch (rule.type) {
        case 'require':
          if (!required(value)) {
            result.isvalid = false;
            result.message = rule.message
          }
          break;
        case 'requireArray':
          if (!requireArray(value)) {
            result.isvalid = false;
            result.message = rule.message
          }
          break;
        case 'requireArrayGreterthenZero':
          if (!requireArrayGreterthenZero(value)) {
            result.isvalid = false;
            result.message = rule.message
          }
          break;
        case 'email':
          if (!email(value)) {
            result.isvalid = false;
            result.message = rule.message
          }
          break;
        case 'password':
          if (!isvalidPassword(value)) {
            result.isvalid = false;
            result.message = rule.message
          }
          break;
        case 'adminAccountPassword':
          if (!isValidPasswordAdminAccount(value)) {
            result.isvalid = false;
            result.message = rule.message
          }
          break;
        case 'compare':
          if (!compare(value, state[rule.compareEle])) {
            result.isvalid = false;
            result.message = rule.message
          }
          break;
        case 'distinct':
          if (!distinct(value, state[(rule.distinctEle)])) {
            result.isvalid = false;
            result.message = rule.message
          }
          break;
        case 'number':
          if (isNaN(value)) {
            result.isvalid = false;
            result.message = rule.message
          }
          break;
        case 'uniqueIdentifier':
          if (!uniqueIdentifier(value)) {
            result.isvalid = false;
            result.message = rule.message
          }
          break;
        case 'maxLength':
          if (!maxLength(value, rule.maxLength)) {
            result.isvalid = false;
            result.message = rule.message
          }
          break;
        case 'minLength':
          if (!minLength(value, rule.minLength)) {
            result.isvalid = false;
            result.message = rule.message
          }
          break;
        case 'maxProspects':

          if (!maxProspects(value, rule.maxProspects)) {
            result.isvalid = false;
            result.message = rule.message
          }
          break;
        case 'minEndDate':

          if (!minEndDate(value, state[rule.minEndDate])) {
            result.isvalid = false;
            result.message = rule.message
          }
          break;
        case 'maxSum':

          if (!maxSum(value, rule.maxSum)) {
            result.isvalid = false;
            result.message = rule.message
          }
          break;
        case 'maxNumber':

          if (!maxNumber(value, state[rule.compareEle])) {
            result.isvalid = false;
            result.message = rule.message
          }
          break;
        case 'minNumber':

          if (!minNumber(value, state[rule.compareEle])) {
            result.isvalid = false;
            result.message = rule.message
          }
          break;
        case 'emailDomain':
          if (!emailDomain(value)) {
            result.isvalid = false;
            result.message = rule.message
          }
          break;
        case 'isValidateURL':
          if (!isValidateURL(value)) {
            result.isvalid = false;
            result.message = rule.message
          }
          break;
        case 'isMinDate':
          if (!minDateCheck(value)) {
            result.isvalid = false;
            result.message = rule.message
          }
          break;
          case 'isDateValid':
            if (!checkValidDateInput(value)) {
              result.isvalid = false;
              result.message = rule.message
            }
            break;
        default:
          return;
      }
    }
  });
  return result;
}

