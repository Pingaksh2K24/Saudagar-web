/**
 * This file contain the all the Common API type of requests
 * 
 */

import { encryptionAPI } from '../../utils/Encryption';
import { APIURL } from './ApiEndPoints';
import { axiosInstance, axiosInstanceWithoutEnrypt } from '../../utils/AxiosInterceptor';
import { IsEncryption } from '../../utils/AppSetting'
import { getAuthProps } from "../../utils/AuthenticationLibrary";
import { isTokenExits } from "../../utils/cookies/CookieHandler";

// common post request with encryption
export function axiosPost(url, request) {
    var data = { data: (IsEncryption) ? encryptionAPI(request, 1) : request };

    return axiosInstance.post(APIURL + url, data);
}

//** POST Authorize */
export function axiosPostAuthorize(url, request, isFormData = false) {
    let loginUser = getAuthProps();
    if (loginUser) {
        if (isTokenExits()) {
            var data = { data: (IsEncryption) ? encryptionAPI(request, 1) : request };
            if (isFormData) {
                let headers = {
                    Authorization: `Bearer ${loginUser.token.token}`,
                    'content-type': 'multipart/form-data',
                };

                return axiosInstance.post(APIURL + url, request, { headers });

            }
            let headers = { Authorization: `Bearer ${loginUser.token.token}` };

            return axiosInstance.post(APIURL + url, data, { headers });
        } else {
            window.location.href = "/";
        }

    }
    else {
        window.location.href = "/";
    }
}

export function axiosGetAuthorize(url, param) {
    let loginUser = getAuthProps();
    if (loginUser) {
        if (isTokenExits()) {
            let headers = { Authorization: `Bearer ${loginUser.token.token}` };
            return axiosInstance.get(APIURL + url.replace("{0}", (IsEncryption) ? encryptionAPI(param, 0) : param), { headers });
        } else {
            window.location.href = "/";
        }
    }
    else {
        window.location.href = "/";
    }
}

// common get request with encryption and one parameter
export function axiosGet(url, param) {
    return axiosInstance.get(APIURL + url.replace("{0}", (IsEncryption) ? encryptionAPI(param, 0) : param));

}


// common get request with encryption and multiple parameter
export function axiosGetMultiParams(url, params) {
    params.forEach((value, key) => {
        url = url.replace("{" + key + "}", (IsEncryption) ? encryptionAPI(value, 0) : value)
    });
    return axiosInstance.get(APIURL + url);
}

// common post request with encryption
export function axiosPostWithoutEncryption(url, request, isFormData) {
    if (isFormData) {
        let headers = {
            // Authorization: `Bearer ${loginUser.token.token}`,
            'content-type': 'multipart/form-data',
        };

        return axiosInstance.post(APIURL + url, request, { headers });

    }
    return axiosInstance.post(APIURL + url, request);
}

export function axiosPostFileAuthorizeblob(url, request, isFormData) {
    let loginUser = getAuthProps();
    if (loginUser) {
        if (isTokenExits()) {
            var data = { data: (IsEncryption) ? encryptionAPI(request, 1) : request };
            // let tokenProp = getTokenProps();
            // let abc = 'Bearer ' + tokenProp.data;
            let headers = { Authorization: `Bearer ${loginUser.token.token}` };

            return axiosInstanceWithoutEnrypt.post(APIURL + url, data, { headers, responseType: 'blob' });
        } else {
            window.location.href = "/";
        }
    } else {
        window.location.href = "/";
    }
}
export function axiosGetFileAuthorizeblob(url, params) {
    let loginUser = getAuthProps();
    if (loginUser) {
        if (isTokenExits()) {
            params.forEach((value, key) => {
                url = url.replace("{" + key + "}", (IsEncryption) ? encryptionAPI(value, 0) : value)
            });
            let headers = { Authorization: `Bearer ${loginUser.token.token}` };
            return axiosInstanceWithoutEnrypt.get(APIURL + url, { headers, responseType: 'blob' });
        }
        else {
            window.location.href = "/";
        }
    }
    else {
        window.location.href = "/";
    }

}

export function axiosGetAuthorizeMultiParams(url, params) {
    let loginUser = getAuthProps();
    if (loginUser) {
        if (isTokenExits()) {
            params.forEach((value, key) => {
                url = url.replace("{" + key + "}", (IsEncryption) ? encryptionAPI(value, 0) : value)
            });
            let headers = { Authorization: `Bearer ${loginUser.token.token}` };
            return axiosInstance.get(APIURL + url, { headers });


        } else {
            window.location.href = "/";
        }
    } else {
        window.location.href = "/";
    }

}
export function axiosGetMultiParamsWithOutEncryption(url, params) {
    params.forEach((value, key) => {
        url = url.replace("{" + key + "}", (IsEncryption) ? value : value)
    });
    let headers = { Authorization: "" };
    return axiosInstanceWithoutEnrypt.get(APIURL + url, { headers, responseType: 'blob' });
}


