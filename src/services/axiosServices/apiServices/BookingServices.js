import {
    AcceptTotalExternalInvoicePaidAmountInReconciliation,
    AcceptTotalMembershipPaidAmountInReconciliation,
    AcceptTotalPaidAmountInReconcilation,
    AcceptTotalPurchaseChapterPaidAmountInReconciliation,
    GetBookingCancellationDetailsById,
    GetBookingCancellationList,
    GetBookingDetailsByBookingId,
    GetBookingDetailsById,
    GetbookingsList,
    GetEventPaymentReconcilationList,
    SavePaymentReconcilationDetailsByAdmin,
    DeleteEventPaymentReconcilation,
    GetOutstandingInvoicesList,
    AddProofInPaymentProofMapping,
    GetAllDropdownsForIndividualBooking,
    DownloadBookingSheetByEventId,
    GetPaymentProofListDetailsByPaymentProofId,
    DownloadBookingInvoiceByBookingId
} from '../ApiEndPoints';
import { axiosGetAuthorize, axiosPostAuthorize, axiosGetMultiParams, axiosGetFileAuthorizeblob, axiosGetAuthorizeMultiParams } from '../AxiosRequests';


export default class BookingServices {

    async getbookingsList(request) {
        return axiosPostAuthorize(GetbookingsList, request)
    }
    async getbookingsCancellationList(request) {
        return axiosPostAuthorize(GetBookingCancellationList, request)
    }
    async getBookingDetailsById(request) {
        return axiosGetAuthorize(GetBookingDetailsById, request);
    }
    async getBookingCancellationDetailsById(request) {
        return axiosGetAuthorize(GetBookingCancellationDetailsById, request);
    }
    async getBookingDetailsByBookingId(request) {
        return axiosGetMultiParams(GetBookingDetailsByBookingId, request);
    }
    // async getEventPaymentReconcilationList(request) {
    //     return axiosPostAuthorize(GetEventPaymentReconcilationList, request)
    // }
    // async getPaymentProofListDetailsByPaymentProofId(request) {
    //     return axiosGetAuthorizeMultiParams(GetPaymentProofListDetailsByPaymentProofId, request)
    // }
    // async savePaymentReconcilationDetailsByAdmin(request) {
    //     return axiosPostAuthorize(SavePaymentReconcilationDetailsByAdmin, request);
    // }
    // async acceptTotalPaidAmountInReconcilation(request) {
    //     return axiosGetAuthorize(AcceptTotalPaidAmountInReconcilation, request);
    // }
    // async acceptTotalMembershipPaidAmountInReconciliation(request) {
    //     return axiosPostAuthorize(AcceptTotalMembershipPaidAmountInReconciliation, request);
    // }
    // async acceptTotalExternalInvoicePaidAmountInReconciliation(request) {
    //     return axiosGetAuthorize(AcceptTotalExternalInvoicePaidAmountInReconciliation, request);
    // }
    // // async acceptTotalPurchaseChapterPaidAmountInReconciliation(request) {
    // //     return axiosGetAuthorize(AcceptTotalPurchaseChapterPaidAmountInReconciliation, request);
    // // }
    // async acceptTotalPurchaseChapterPaidAmountInReconciliation(request) {
    //     return axiosGetAuthorizeMultiParams(AcceptTotalPurchaseChapterPaidAmountInReconciliation, request);
    // }
    async deleteEventPaymentReconcilation(request) {
        return axiosPostAuthorize(DeleteEventPaymentReconcilation, request)
    }
    // async getOutstandingInvoicesList(request) {
    //     return axiosPostAuthorize(GetOutstandingInvoicesList, request)
    // }
    // async addProofInPaymentProofMapping(request) {
    //     return axiosPostAuthorize(AddProofInPaymentProofMapping, request);
    // }

    async getAllDropdownsForIndividualBooking(request) {
        return axiosGetAuthorize(GetAllDropdownsForIndividualBooking, request);
    }


    async downloadBookingSheetByEventId(request) {
        return axiosGetFileAuthorizeblob(DownloadBookingSheetByEventId, request);
    }
    async downloadBookingInvoiceByBookingId(request) {
        return axiosGetFileAuthorizeblob(DownloadBookingInvoiceByBookingId, request);
    }
}