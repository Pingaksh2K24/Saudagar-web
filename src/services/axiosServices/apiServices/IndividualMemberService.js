import {
    GetIndividualMemberList,
    ActiveInActiveIndividualMember,
    DeleteIndividualMember,
    GetAllDropdownsForIndividualMember,
    AddEditIndividualSIISInformation,
    AddEditEngagementTracking,
    GetIndividualSIISInformation,
    GetIndividualEngagementTrackingList,
    GetIndividualMemberSubscription,
    GetIndividualEngagementTrackingById,
    GetBookingListForIndividualMemberById,
    AddEditIndividualCompanyInformation,
    GetIndividualOthersInformationById,
    GetIndividualInstituteInformationDetailsById,
    AddEditIndividualInstituteInformationDetails,
    UpdateIndividualOthersInformation,
    AddEditCommunicationProfile,
    GetIndividualCommunication,
    GetIndividualInformationByIndividualId,
    UpdateIndividualInformationByIndividualId,
    AddEditIndividualOtherInformation,
    AddEditIndividualMemberSubscription,
    GetIndividualFinanceReceiptInvoice,
    GetIndividualFinancialInfo,
    GetInvoiceReceiptPdfByBookingId,
    FinanceGetCreditNoteInvoiceForIndividual,
    GetCreditNoteInfoForIndividualMember,
    GetCancellationReasonForCreditNoteForIndividualMember,
    AddFinanceCreditNoteForIndividual
} from "../ApiEndPoints";
import {
    axiosGetAuthorize,
    axiosGetFileAuthorizeblob,
    axiosPostAuthorize,
    axiosPostWithoutEncryption,
    axiosGetMultiParams
} from "../AxiosRequests";

export default class IndividualMemberService {

    async getIndividualMemberList(request) {
        return axiosPostAuthorize(GetIndividualMemberList, request);
    }
    async activeInActiveIndividualMember(request) {
        return axiosPostAuthorize(ActiveInActiveIndividualMember, request);
    }
    async deleteIndividualMember(request) {
        return axiosPostAuthorize(DeleteIndividualMember, request);
    }
    async getAllDropdownForIndividualMember() {
        return axiosGetAuthorize(GetAllDropdownsForIndividualMember);
    }
    async addEditIndividualSIISInformation(request) {
        return axiosPostAuthorize(AddEditIndividualSIISInformation, request);
    }
    async addEditEngagementTracking(request) {
        return axiosPostAuthorize(AddEditEngagementTracking, request);
    }
    async addEditIndividualMemberSubscription(request) {
        return axiosPostAuthorize(AddEditIndividualMemberSubscription, request);
    }
    async getIndividualSIISInformation(request) {
        return axiosGetAuthorize(GetIndividualSIISInformation, request);
    }
    async getIndividualEngagementTrackingList(request) {
        return axiosGetAuthorize(GetIndividualEngagementTrackingList, request);
    }
    async getIndividualMemberSubscription(request) {
        return axiosGetAuthorize(GetIndividualMemberSubscription, request);
    }
    async getIndividualOthersInformationById(request) {
        return axiosGetAuthorize(GetIndividualOthersInformationById, request);
    }
    async getIndividualInformationByIndividualId(request) {
        return axiosGetAuthorize(GetIndividualInformationByIndividualId, request);
    }
    async getIndividualEngagementTrackingById(request) {
        return axiosGetAuthorize(GetIndividualEngagementTrackingById, request);
    }
    async getIndividualInstituteInformationDetailsById(request) {
        return axiosGetAuthorize(GetIndividualInstituteInformationDetailsById, request);
    }
    async getBookingListForIndividualMemberById(request) {
        return axiosPostAuthorize(GetBookingListForIndividualMemberById, request);
    }
    async addEditIndividualInstituteInformationDetails(request) {
        return axiosPostAuthorize(AddEditIndividualInstituteInformationDetails, request);
    }
    async updateIndividualOthersInformation(request) {
        return axiosPostAuthorize(UpdateIndividualOthersInformation, request);
    }
    async updateIndividualInformationByIndividualId(request) {
        return axiosPostAuthorize(UpdateIndividualInformationByIndividualId, request);
    }
    async addEditIndividualCompanyInformation(request) {
        return axiosPostAuthorize(AddEditIndividualCompanyInformation, request);
    }
    async addEditCommunicationProfile(request) {
        return axiosPostAuthorize(AddEditCommunicationProfile, request);
    }
    async getIndividualCommunication(request) {
        return axiosGetAuthorize(GetIndividualCommunication, request);
    }
    async addEditIndividualOtherInformation(request) {
        return axiosPostAuthorize(AddEditIndividualOtherInformation, request);
    }
    async getIndividualFinanceReceiptInvoice(request) {
        return axiosGetFileAuthorizeblob(GetIndividualFinanceReceiptInvoice, request);
    }
    async getIndividualFinancialInfo(request) {
        return axiosGetAuthorize(GetIndividualFinancialInfo, request);
    }
    async financeGetCreditNoteInvoiceForIndividual(request) {
        return axiosGetFileAuthorizeblob(FinanceGetCreditNoteInvoiceForIndividual, request);
    }
    
    async getCreditNoteInfoForIndividualMember(request) {
        return axiosGetMultiParams(GetCreditNoteInfoForIndividualMember, request);
      }
      async getCancellationReasonForCreditNote(request) {
        return axiosGetAuthorize(GetCancellationReasonForCreditNoteForIndividualMember, request);
    }
    async addFinanceCreditNoteForIndividual(request) {
        return axiosPostAuthorize(AddFinanceCreditNoteForIndividual, request);
    }

    async getInvoiceReceiptPdfByBookingId(request) {
        return axiosGetFileAuthorizeblob(GetInvoiceReceiptPdfByBookingId, request);
    }
}