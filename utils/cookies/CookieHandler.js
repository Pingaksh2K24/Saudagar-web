import Cookies from 'universal-cookie';
import { encryptionData, decryptionData } from "../Encryption";
import { IsCookieEncryption, Value3 } from "../AppSetting";

const cookies = new Cookies();

//Create cookie with expiration
export const createCookie = (props) => {
    let cookieValue = props.cookieValue;
    let cookieName = props.cookieName;

    // check if encryption is required for the cookie.
    if (IsCookieEncryption) {
        cookieValue = encryptionData(cookieValue, 1);
    }
    cookies.set(cookieName, cookieValue,
        {
            path: props.path,
            maxAge: props.expirationTime * 60,
        });
};

//Store cookie
export const setCookie = (props) => {
    let cookieValue = props.cookieValue;
    let cookieName = props.cookieName;

    if (IsCookieEncryption) {
        cookieValue = encryptionData(cookieValue, 1);
    }
    cookies.set(cookieName, cookieValue);
}

//Get a cookie value
export function getCookie(cookieName, doNotParse = false) {
    if (IsCookieEncryption) {
        const cookieValue = cookies.get(cookieName, { doNotParse: doNotParse })
        if (cookieValue)
            return decryptionData(cookieValue, true);
    }
    else {
        return cookies.get(cookieName, { doNotParse: doNotParse })
    }
    return undefined;
}

//Get all cookies
export const getAllCookies = (doNotParse = false) => {
    const cookieValue = cookies.getAll({ doNotParse: doNotParse });
    if (IsCookieEncryption) {
        return decryptionData(cookieValue, true);
    }
    return cookieValue;
};

//Remove cookie
export const removeCookie = (cookieName, options = {}) => {
    cookies.remove(cookieName, options);
};

//Remove all cookie
export const removeAllCookies = () => {
    Object.keys(cookies.cookies).forEach(element => {
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
}

export const isTokenExits = (cookieName = Value3) => {
    if(isCookieExist(cookieName)){
        const cookieDetail = getCookie(cookieName);
        let date = new Date();
         let currentDate = new Date().getTime();
       // let currentDate = new Date(Date.UTC(2010, 01, 28));
        let expire = new Date(cookieDetail.token.expires).getTime();
        if (cookieDetail && cookieDetail.token && expire > currentDate) {
            
            return true;
        }else
            return false;
    }
    else{
        return false;
    }

}