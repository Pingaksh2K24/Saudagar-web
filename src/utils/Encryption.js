import CryptoJS from 'crypto-js';

// Secret key from environment or default
const SECRET_KEY = process.env.NEXT_PUBLIC_SECRET_KEY || 'saudagar-secret-key-2024';

// Basic encrypt/decrypt
export const encrypt = (text) => {
  try {
    return CryptoJS.AES.encrypt(text, SECRET_KEY).toString();
  } catch (error) {
    console.error('Encryption error:', error);
    return text;
  }
};

export const decrypt = (encryptedText) => {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedText, SECRET_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    console.error('Decryption error:', error);
    return encryptedText;
  }
};

// Cookie encryption/decryption
export const encryptCookie = (data) => {
  try {
    const jsonString = JSON.stringify(data);
    return encrypt(jsonString);
  } catch (error) {
    console.error('Cookie encryption error:', error);
    return data;
  }
};

export const decryptCookie = (encryptedData) => {
  try {
    const decryptedString = decrypt(encryptedData);
    return JSON.parse(decryptedString);
  } catch (error) {
    console.error('Cookie decryption error:', error);
    return null;
  }
};

// API request encryption
export const encryptApiRequest = (requestData) => {
  try {
    const jsonString = JSON.stringify(requestData);
    return {
      encryptedData: encrypt(jsonString),
      timestamp: Date.now()
    };
  } catch (error) {
    console.error('API request encryption error:', error);
    return requestData;
  }
};

// API response decryption
export const decryptApiResponse = (encryptedResponse) => {
  try {
    if (encryptedResponse.encryptedData) {
      const decryptedString = decrypt(encryptedResponse.encryptedData);
      return JSON.parse(decryptedString);
    }
    return encryptedResponse;
  } catch (error) {
    console.error('API response decryption error:', error);
    return encryptedResponse;
  }
};

// Utility functions
export const encryptObject = (obj) => encryptApiRequest(obj);
export const decryptObject = (encryptedObj) => decryptApiResponse(encryptedObj);