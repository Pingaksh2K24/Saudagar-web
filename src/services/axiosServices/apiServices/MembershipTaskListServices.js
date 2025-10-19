import {
    axiosGet,
    axiosPost,
    axiosGetAuthorize,
    axiosPostAuthorize,
    axiosPostWithoutEncryption,
    axiosGetFileAuthorizeblob,
    axiosPostFileAuthorizeblob,
    axiosGetMultiParams
} from '../AxiosRequests';

import {
    GetAllTaskList,
    GetTaskByCompanyId,
    GetAllDropdownsForMembershipTaskList,
    AddEditMembershipTaskAndSendForApproval,
    GetAllPriceTables,
    GetExistingDiscountTableByTaskId,
    SendQuotationEmailToCorporateMember,
    GetCalculatedFinalPrice,
    SendEscalateMailToMember,
    AddEditMembershipTaskAndSendPaymentLink, DownloadQuotation,
    GetMembershipPeriods,
    GetMembershipPeriods2,
    DeleteTaskListDetailsByTaskId
} from "../ApiEndPoints";

export default class MembershipTaskListServices {
    async getAllTaskList(request) {
        return axiosPost(GetAllTaskList, request);
    }
    async getAllDropdownsForMembershipTaskList() {
        return axiosGetAuthorize(GetAllDropdownsForMembershipTaskList);
    }
    async getTaskByCompanyId(request) {
        return axiosGet(GetTaskByCompanyId, request)
    }
    async getPriceTabelForTaskListProcess(request) {
        return axiosPostAuthorize(GetAllPriceTables, request)
    }
    async getExistingDiscountTableByTaskId(request) {
        return axiosGetAuthorize(GetExistingDiscountTableByTaskId, request);
    }
    async getAllPriceTables(request) {
        return axiosPostAuthorize(GetAllPriceTables, request)
    }
    async sendQuotationEmailToCorporateMember(request) {
        return axiosPostAuthorize(SendQuotationEmailToCorporateMember, request);
    }
    async addEditMembershipTaskAndSendForApproval(request) {
        return axiosPostAuthorize(AddEditMembershipTaskAndSendForApproval, request)
    }
    async getCalculatedFinalPrice(request) {
        return axiosPostAuthorize(GetCalculatedFinalPrice, request)
    }
    async addEditMembershipTaskAndSendPaymentLink(request) {
        return axiosPostAuthorize(AddEditMembershipTaskAndSendPaymentLink, request)
    }
    async sendEscalateMailToMember(request) {
        return axiosPostAuthorize(SendEscalateMailToMember, request);
    }
    async downloadQuotation(request) {
        return axiosPostFileAuthorizeblob(DownloadQuotation, request)
    }
    async GetMembershipPeriods(request) {
        return axiosGet(GetMembershipPeriods, request);
    }
    async GetMembershipPeriods2(request) {
        return axiosPost(GetMembershipPeriods2, request);
    }
    async DeleteTaskListDetailsByTaskId(request) {
        return axiosGetMultiParams(DeleteTaskListDetailsByTaskId, request)
    }
    
    
}