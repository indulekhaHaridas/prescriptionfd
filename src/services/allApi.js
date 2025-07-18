import { commonApi } from "./commonApi"
import { serverUrl } from "./serverUrl"

export const registerApi = async (reqBody) => {
    return await commonApi('POST', `${serverUrl}/register`, reqBody);
};

export const LoginApi = async (reqBody) => {
    return await commonApi('POST', `${serverUrl}/login`, reqBody);
};


// Create prescription
export const createPrescriptionApi = async (reqBody) => {
  return await commonApi('POST', `${serverUrl}/add-prescription`, reqBody);
};

// Get all prescriptions
export const getAllPrescriptionsApi = async () => {
  return await commonApi('GET', `${serverUrl}/prescriptions`);
};



export const getMedicineSuggestionsApi = async (query) => {
  return await commonApi('GET', `${serverUrl}/medicines?query=${query}`);
};


