import {
    axiosGet,
    axiosPost,
    axiosGetAuthorize,
    axiosPostAuthorize,
    axiosPostWithoutEncryption,
    axiosGetMultiParams
} from '../AxiosRequests';

import {
    GetAllIndividualMembershipTaskList,
    GetAllIndividualInformationDetailsById,
    AcceptIndividualStudentApplication,
    RejectMemberApplication,
    GetMembershipPricingForIndividual,
    SendReconciliationPaymentLinkToIndividualEducator,
    GeneratePaymentInvoiceForIndividual,
    AddIndividualMembershipPaymentData,
    DeleteTaskListDetailsByTaskId
} from "../ApiEndPoints";

export default class IndividalMemberTaskListServices {
    async getAllIndividualMembershipTaskList(request) {
        return axiosPost(GetAllIndividualMembershipTaskList, request);
    }
    async getAllIndividualInformationDetailsById(request) {
        return axiosGet(GetAllIndividualInformationDetailsById, request)
    }
    async acceptIndividualStudentApplication(request) {
        return axiosPostAuthorize(AcceptIndividualStudentApplication, request)
    }
    async rejectMemberApplication(request) {
        return axiosPostAuthorize(RejectMemberApplication, request)
    }
    async getMembershipPricingForIndividual(request) {
        return axiosGet(GetMembershipPricingForIndividual, request);
    }
    async sendReconciliationPaymentLinkToIndividualEducator(request) {
        return axiosPostAuthorize(SendReconciliationPaymentLinkToIndividualEducator, request);
    }
    async generatePaymentInvoiceForIndividual(request) {
        return axiosPostAuthorize(GeneratePaymentInvoiceForIndividual, request)
    }
    async addIndividualMembershipPaymentData(request) {
        return axiosPostAuthorize(AddIndividualMembershipPaymentData, request)
    }
    async deleteTaskListDetailsByTaskId(request) {
        return axiosGetMultiParams(DeleteTaskListDetailsByTaskId, request)
    }
}