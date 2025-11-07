/**
 * This file contain the all the Common API type of requests
 *
 */

import { APIURL } from './ApiEndPoints';
import {
  axiosInstance,
  axiosInstanceWithoutEnrypt,
} from '../../../utils/AxiosInterceptor';
import { getAuthProps } from '../../../utils/AuthenticationLibrary';
import { isTokenExits } from '../../../utils/cookies/CookieHandler';

// common post request
export function axiosPost(url, request) {
  console.log('API URL:', APIURL + url, request);
  return axiosInstance.post(APIURL + url, request);
}
//** POST Authorize */
export function axiosPostAuthorize(url, request, isFormData = false) {
  let loginUser = getAuthProps();
  if (loginUser) {
    if (isTokenExits()) {
      if (isFormData) {
        let headers = {
          Authorization: `Bearer ${loginUser?.token.accessToken}`,
          'content-type': 'multipart/form-data',
        };
        return axiosInstance.post(APIURL + url, request, { headers });
      }
      let headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${loginUser?.token.accessToken}`,
      };

      return axiosInstance.post(APIURL + url, request, { headers });
    } else {
      window.location.href = '/';
    }
  } else {
    window.location.href = '/';
  }
}
export function axiosGetAuthorize(url, param) {
  let loginUser = getAuthProps();
  if (loginUser) {
    if (isTokenExits()) {
      let headers = { Authorization: `Bearer ${loginUser.token.accessToken}` };
      return axiosInstance.get(APIURL + url.replace('{0}', param), { headers });
    } else {
      window.location.href = '/';
    }
  } else {
    window.location.href = '/';
  }
}
// common get request with one parameter
export function axiosGet(url, param) {
  return axiosInstance.get(APIURL + url.replace('{0}', param));
}
// common get request with encryption and multiple parameter
export function axiosGetMultiParams(url, params) {
  params.forEach((value, key) => {
    url = url.replace('{' + key + '}', value);
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
      let headers = { Authorization: `Bearer ${loginUser.token.accessToken}` };

      return axiosInstanceWithoutEnrypt.post(APIURL + url, request, {
        headers,
        responseType: 'blob',
      });
    } else {
      window.location.href = '/';
    }
  } else {
    window.location.href = '/';
  }
}
export function axiosGetFileAuthorizeblob(url, params) {
  let loginUser = getAuthProps();
  if (loginUser) {
    if (
      true
      // isTokenExits()
    ) {
      params.forEach((value, key) => {
        url = url.replace('{' + key + '}', value);
      });
      let headers = { Authorization: `Bearer ${loginUser.token.token}` };
      return axiosInstanceWithoutEnrypt.get(APIURL + url, {
        headers,
        responseType: 'blob',
      });
    } else {
      window.location.href = '/';
    }
  } else {
    window.location.href = '/';
  }
}
export function axiosGetAuthorizeMultiParams(url, params) {
  let loginUser = getAuthProps();
  if (loginUser) {
    if (isTokenExits()) {
      params.forEach((value, key) => {
        url = url.replace('{' + key + '}', value);
      });
      let headers = { Authorization: `Bearer ${loginUser.token.accessToken}` };
      return axiosInstance.get(APIURL + url, { headers });
    } else {
      window.location.href = '/';
    }
  } else {
    window.location.href = '/';
  }
}
export function axiosGetMultiParamsWithOutEncryption(url, params) {
  params.forEach((value, key) => {
    url = url.replace('{' + key + '}', value);
  });
  let headers = { Authorization: '' };
  return axiosInstanceWithoutEnrypt.get(APIURL + url, {
    headers,
    responseType: 'blob',
  });
}
// common PUT request
export function axiosPut(url, request, param) {
  const finalUrl = param ? url.replace('{0}', param) : url;
  console.log('API URL:', APIURL + finalUrl, request);
  return axiosInstance.put(APIURL + finalUrl, request);
}
// PUT request with authorization
export function axiosPutAuthorize(url, request, param, isFormData = false) {
  let loginUser = getAuthProps();
  if (loginUser) {
    if (isTokenExits()) {
      const finalUrl = param ? url.replace('{0}', param) : url;
      if (isFormData) {
        let headers = {
          Authorization: `Bearer ${loginUser?.token.accessToken}`,
          'content-type': 'multipart/form-data',
        };
        return axiosInstance.put(APIURL + finalUrl, request, { headers });
      }
      let headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${loginUser?.token.accessToken}`,
      };
      return axiosInstance.put(APIURL + finalUrl, request, { headers });
    } else {
      window.location.href = '/';
    }
  } else {
    window.location.href = '/';
  }
}
// common DELETE request
export function axiosDelete(url, param) {
  const finalUrl = param ? APIURL + url.replace('{0}', param) : APIURL + url;
  console.log('API URL:', finalUrl);
  return axiosInstance.delete(finalUrl);
}
// DELETE request with authorization
export function axiosDeleteAuthorize(url, param) {
  let loginUser = getAuthProps();
  if (loginUser) {
    if (isTokenExits()) {
      const finalUrl = param
        ? APIURL + url.replace('{0}', param)
        : APIURL + url;
      let headers = {
        Authorization: `Bearer ${loginUser?.token.accessToken}`,
      };
      return axiosInstance.delete(finalUrl, { headers });
    } else {
      window.location.href = '/';
    }
  } else {
    window.location.href = '/';
  }
}
