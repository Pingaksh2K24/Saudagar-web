import { createCookie, getCookie, removeAllCookies, isCookieExist, setCookie } from "./cookies/CookieHandler";
import { loginRequest, msalConfig } from "../HOC/authConfig";
import { PublicClientApplication } from "@azure/msal-browser";
import { Value3, Value4 } from "./AppSetting";
import { useEffect, useState } from "react";
const msalInstance = new PublicClientApplication(msalConfig);

const authCookieName = Value3;
const tokenCookieName = Value4;


export const setAuthProps = (data) => {
    const authProps = {
        cookieName: authCookieName,
        cookieValue: data,
        expirationTime: data.sessionTimeout
    }
    createCookie(authProps);
    setTokenProps(data.token);
}

export const getAuthProps = () => {
    return getCookie(authCookieName);
}

export const isAuthorized = () => {
    return isCookieExist(authCookieName);
}

export const setTokenProps = (data) => {
    const tokenProps = {
        cookieName: tokenCookieName,
        cookieValue: data
    }
    setCookie(tokenProps);
}

export const getTokenProps = () => {
    return getCookie(tokenCookieName);
}

export const signOut = () => {
    removeAllCookies();
    const homeAccountId = JSON.parse(localStorage.getItem('homeAccountId'));
    if (homeAccountId) {
        const logoutRequest = {
            account: msalInstance.getAccountByHomeId(homeAccountId),
            postLogoutRedirectUri: "/login",
        };
        msalInstance["browserStorage"].clear();
        msalInstance.logoutRedirect(logoutRequest)
        localStorage.removeItem("homeAccountId");
    }
    else {
        window.location.href = "/login";
    }
}



export const InactivityDetector = (timeoutInMilliseconds) => {
    const [inactive, setInactive] = useState(false);
    // Declare inactivityTimer variable using let
    let inactivityTimer;

    // Function to reset the timer when there's activity
    const resetTimer = () => {
        clearTimeout(inactivityTimer);
        inactivityTimer = setTimeout(() => {
            setInactive(true);
        }, timeoutInMilliseconds);
    };

    useEffect(() => {
        const handleMouseMovement = () => resetTimer();

        window.addEventListener('mousemove', handleMouseMovement);
        window.addEventListener('keydown', handleMouseMovement);
        window.addEventListener('click', handleMouseMovement);

        // Start the initial timer
        resetTimer();

        return () => {
            window.removeEventListener('mousemove', handleMouseMovement);
            window.removeEventListener('keydown', handleMouseMovement);
            window.removeEventListener('click', handleMouseMovement);
            clearTimeout(inactivityTimer);
        };
    }, [timeoutInMilliseconds]);

    useEffect(() => {
        if (inactive) {
            signOut()
        }
    }, [inactive]);
};