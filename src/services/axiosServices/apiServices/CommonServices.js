import {
    axiosGetAuthorize,
    axiosGetMultiParamsWithOutEncryption,
    axiosPostWithoutEncryption,axiosGetFileAuthorizeblob
} from '../AxiosRequests';
import {
    GetAllAreaOfExpertise,
    GetAllBusinessSectors,
    GetAllChapters,
    GetAllCountries,
    GetAllStatus,
    uploadPDF,
    StoreBase64Image,
    GetAllDropdownsForCorporateMember,
    GetPDF,DownloadImage,GetPaymentFiles
} from '../ApiEndPoints';

export default class CommonServices {

    async getAllAreaOfExpertise() {
        return axiosGetAuthorize(GetAllAreaOfExpertise);
    }
    async getAllBusinessSectors() {
        return axiosGetAuthorize(GetAllBusinessSectors);
    }
    async getAllChapters() {
        return axiosGetAuthorize(GetAllChapters);
    }
    async getAllCountries() {
        return axiosGetAuthorize(GetAllCountries);
    }
    async getAllStatus() {
        return axiosGetAuthorize(GetAllStatus);
    }
    async uploadPDF(request) {
        let formData = new FormData();
        formData.append("file", request.file);
        formData.append("filename", request.filename);
        formData.append("storagePath", request.storagePath);
        return axiosPostWithoutEncryption(uploadPDF, formData, true);
    }
    async storeBase64Image(request) {
        return axiosPostWithoutEncryption(StoreBase64Image, request, false);
    }
    async getAllDropdownForCorporateMember(request) {
        return axiosGetAuthorize(GetAllDropdownsForCorporateMember, request);
    }
    async getPDF(request) {
        return axiosGetMultiParamsWithOutEncryption(GetPDF, request);
    }
    async DownloadImage(request) {
        return axiosGetFileAuthorizeblob(DownloadImage, request);
    }
    async GetPaymentFiles(request) {
        return axiosGetFileAuthorizeblob(GetPaymentFiles, request);
    }


}