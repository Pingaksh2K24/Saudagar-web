import Cookies from 'universal-cookie';
import { encryptCookie, decryptCookie } from '../Encryption';
import { IsCookieEncryption, Value3 } from '../AppSetting';

const cookies = new Cookies();

//Create cookie with expiration
export const createCookie = (props) => {
  let cookieValue = props.cookieValue;
  let cookieName = props.cookieName;
  let createdAt = props.createdAt;
  // check if encryption is required for the cookie.
  if (IsCookieEncryption) {
    cookieValue = encryptCookie(cookieValue, 1);
    console.log('Encrypted Cookie Value:', cookieValue);
  }
  cookies.set(cookieName, {
    ...cookieValue,
    createdAt: createdAt
  }, {
    path: props.path,
    maxAge: props.expirationTime,
  });
};

//Store cookie
export const setCookie = (props) => {
  let cookieValue = props.cookieValue;
  let cookieName = props.cookieName;

  if (IsCookieEncryption) {
    cookieValue = encryptCookie(cookieValue, 1);
  }
  cookies.set(cookieName, cookieValue);
};

//Get a cookie value
export function getCookie(cookieName, doNotParse = false) {
  if (IsCookieEncryption) {
    const cookieValue = cookies.get(cookieName, { doNotParse: doNotParse });
    if (cookieValue) return decryptCookie(cookieValue, true);
  } else {
    return cookies.get(cookieName, { doNotParse: doNotParse });
  }
  return undefined;
}

//Get all cookies
export const getAllCookies = (doNotParse = false) => {
  const cookieValue = cookies.getAll({ doNotParse: doNotParse });
  if (IsCookieEncryption) {
    return decryptCookie(cookieValue, true);
  }
  return cookieValue;
};

//Remove cookie
export const removeCookie = (cookieName, options = {}) => {
  cookies.remove(cookieName, options);
};

//Remove all cookie
export const removeAllCookies = () => {
  Object.keys(cookies.cookies).forEach((element) => {
    cookies.remove(element, {});
  });
};

//Check cookie exist or not
export const isCookieExist = (cookieName) => {
  const cookieDetail = getCookie(cookieName);
  if (cookieDetail) {
    return true;
  }
  return false;
};

export const isTokenExits = (cookieName = Value3) => {
  if (isCookieExist(cookieName)) {  
    const cookieDetail = getCookie(cookieName);
    if (cookieDetail && cookieDetail.token && cookieDetail.createdAt) {
      const createdAt = new Date(cookieDetail.createdAt).getTime();
      const currentTime = new Date().getTime();
      const expiresInSeconds = cookieDetail.token.expiresIn; // 30 days in seconds
      const expiryTime = createdAt + (expiresInSeconds * 1000); // convert seconds to milliseconds
      return currentTime < expiryTime;
    }
    return false;
  }
  return false;
};
