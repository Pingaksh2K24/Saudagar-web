import {uploadPDF } from "../ApiEndPoints";
import { axiosGetAuthorize, axiosGetMultiParams, axiosPostAuthorize, axiosPostWithoutEncryption } from "../AxiosRequests";

export default class IndividualBookingServices {

    
    async uploadPDF(request) {
        let formData = new FormData();
        formData.append("file", request.file);
        formData.append("filename", request.filename);
        formData.append("storagePath", request.storagePath);

        return axiosPostWithoutEncryption(uploadPDF, formData, true);
    }

    
}