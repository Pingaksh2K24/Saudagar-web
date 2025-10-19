import {
    GetEventPaymentReconcilationList,
    GetAllDropDownForEntryManagement,
    GetPaymentProofListDetailsByPaymentProofId,
    GetOutstandingInvoicesList,
    AddProofInPaymentProofMapping,
    SavePaymentReconcilationDetailsByAdmin,
    AcceptTotalPaidAmountInReconcilation,
    AcceptTotalMembershipPaidAmountInReconciliation,
    GetFinanceGSTSettingList,
    GetFinanceClassCodeSettingList,
    GetFinanceAccountCodeSettingList,
    GetFinanceCreditNoteApprovalList,
    GetCancellationReasonForCreditNote,
    AddFinanceCreditNote,
    GetAllDropdownsForFinanceAdhokInvoices,
    FinanceGetAllPendingEventApprovalList,
    financeEventInvoiceApproval,
    GetAllVoucherCodeList,
    GetAllVoucherCodeReportList,
    GenerateVoucherCodeReport,
    DownloadSheetByVoucherCodeReportId,
    ApplyVoucherCodeForMembershipPayment,
    GetAllChapterListForVoucher,
    GetVoucherCodeDetailsById,
    ActiveInActiveVoucherCode,
    GetAllMemberListForVoucher,
    DeleteFinanceGlobal,
    AddEditVoucherCodeDetails,
    GetAllExtractInvoicesList,
    FinanceGetInvoice,
    FinanceGetCreditNoteInvoice,
    GetFinanceAdhocInvoiceList,
    GetGSTRate,
    ZipInvoices,
    AddEditFinanceAdhokInvoiceDetail,
    GetFinanceCreditNoteStatusList,
    GetAllFinanceCreditNoteList,
    GetAllDeferredIncomeReportList,
    DownloadSheetByDeferredIncomeReportId,
    GenerateDeferredIncomeReport,
    GetFinanceCreditNoteById,
    GetFinanceAdhokInvoiceDetail,
    AddEditFinanceGST,
    AddEditFinanceCreditNoteApproval,
    AddEditFinanceClassCode,
    AddEditFinanceAccountCode,
    GetTransactionRecordList,
    GetCreditNoteInfoForCorporateMember,
    FinanceUpdateCreditNote,
    GetAllIndividualMemberListForVoucher,
    FinanceApproveRejectCreditNoteApproval,
    DownloadSheetByTransactionReportId,
    DownloadSheetForTransactionRecord,
    DownloadSheetForXeroInvoiceExtractionRecords,
    FinanceAddCreditNotePaymentProofMapping,
    FinanceUpdateStatusForCreditNote,
    AcceptTotalExternalInvoicePaidAmountInReconciliation,
    AddEditFinanceExternalServiceDetail,
    GetFinanceExternalServiceDetailById,
    AddDrawdownForExternalServiceItem,
    UpdateFormPaymentHistory

} from '../ApiEndPoints';
import { axiosGetAuthorize, axiosPostAuthorize, axiosGetMultiParams, axiosGetFileAuthorizeblob, axiosGetAuthorizeMultiParams, axiosPostFileAuthorizeblob } from '../AxiosRequests';


export default class FinanceServices {

    async updateFormPaymentHistory(request) {
        return axiosGetMultiParams(UpdateFormPaymentHistory, request);
    }
    async getEventPaymentReconcilationList(request) {
        return axiosPostAuthorize(GetEventPaymentReconcilationList, request)
    }
    async getAllDropDownForEntryManagement(request) {
        return axiosGetAuthorize(GetAllDropDownForEntryManagement, request);
    }
    async getPaymentProofListDetailsByPaymentProofId(request) {
        return axiosGetAuthorizeMultiParams(GetPaymentProofListDetailsByPaymentProofId, request)
    }
    async getOutstandingInvoicesList(request) {
        return axiosPostAuthorize(GetOutstandingInvoicesList, request)
    }
    async addProofInPaymentProofMapping(request) {
        return axiosPostAuthorize(AddProofInPaymentProofMapping, request);
    }
    async savePaymentReconcilationDetailsByAdmin(request) {
        return axiosPostAuthorize(SavePaymentReconcilationDetailsByAdmin, request);
    }
    async acceptTotalPaidAmountInReconcilation(request) {
        return axiosGetAuthorize(AcceptTotalPaidAmountInReconcilation, request);
    }
    async acceptTotalMembershipPaidAmountInReconciliation(request) {
        return axiosPostAuthorize(AcceptTotalMembershipPaidAmountInReconciliation, request);
    }
    async getFinanceGSTSettingList(request) {
        return axiosGetAuthorize(GetFinanceGSTSettingList, request);
    }
    async getFinanceClassCodeSettingList(request) {
        return axiosGetAuthorize(GetFinanceClassCodeSettingList, request);
    }
    async getFinanceAccountCodeSettingList(request) {
        return axiosGetAuthorize(GetFinanceAccountCodeSettingList, request);
    }
    async getFinanceCreditNoteApprovalList(request) {
        return axiosGetAuthorize(GetFinanceCreditNoteApprovalList, request);
    }

    // View Edit Entries
    async getCancellationReasonForCreditNote(request) {
        return axiosGetAuthorize(GetCancellationReasonForCreditNote, request);
    }

    async addFinanceCreditNote(request) {
        return axiosPostAuthorize(AddFinanceCreditNote, request);
    }

    async getAllDropdownsForFinanceAdhokInvoices(request) {
        return axiosGetAuthorize(GetAllDropdownsForFinanceAdhokInvoices, request)
    }

    // Event Registration Approval
    async financeGetAllPendingEventApprovalList(request) {
        return axiosPostAuthorize(FinanceGetAllPendingEventApprovalList, request);
    }

    async financeApproveRejectEventApproval(request) {
        return axiosPostAuthorize(financeEventInvoiceApproval, request);
    }

    //Voucher Management
    async getAllVoucherCodeList(request) {
        return axiosPostAuthorize(GetAllVoucherCodeList, request);
    }

    async getVoucherCodeDetailsById(request) {
        return axiosGetAuthorize(GetVoucherCodeDetailsById, request);
    }
    async activeInActiveVoucherCode(request) {
        return axiosPostAuthorize(ActiveInActiveVoucherCode, request);
    }
    async getAllMemberListForVoucher(request) {
        return axiosGetAuthorize(GetAllMemberListForVoucher, request);
    }

    async getAllIndividualMemberListForVoucher(request) {
        return axiosGetAuthorize(GetAllIndividualMemberListForVoucher, request)
    }
    async deleteFinanceGST(request) {
        return axiosPostAuthorize(DeleteFinanceGlobal, request);
    }
    async addEditVoucherCodeDetails(request) {
        return axiosPostAuthorize(AddEditVoucherCodeDetails, request);
    }
    async getAllChapterListForVoucher(request) {
        return axiosGetAuthorize(GetAllChapterListForVoucher, request);
    }
    async applyVoucherCodeForMembershipPayment(request) {
        return axiosPostAuthorize(ApplyVoucherCodeForMembershipPayment, request);
    }
    // For Voucher Reports
    async getAllVoucherCodeReportList(request) {
        return axiosPostAuthorize(GetAllVoucherCodeReportList, request);
    }
    async generateVoucherCodeReport(request) {
        return axiosPostAuthorize(GenerateVoucherCodeReport, request);
    }
    async downloadSheetByVoucherCodeReportId(request) {
        return axiosGetFileAuthorizeblob(DownloadSheetByVoucherCodeReportId, request);
    }
    async GetAllExtractInvoicesList(request) {
        return axiosPostAuthorize(GetAllExtractInvoicesList, request);
    }
    async financeGetInvoice(request) {
        return axiosGetFileAuthorizeblob(FinanceGetInvoice, request);
    }

    async financeGetCreditNoteInvoice(request) {
        return axiosGetFileAuthorizeblob(FinanceGetCreditNoteInvoice, request);
    }
    async getFinanceAdhocInvoiceList(request) {
        return axiosPostAuthorize(GetFinanceAdhocInvoiceList, request)
    }
    async getGSTRate(request) {
        return axiosGetAuthorize(GetGSTRate, request);
    }
    async zipInvoices(request) {
        return axiosPostAuthorize(ZipInvoices, request);
    }
    async addEditFinanceAdhokInvoiceDetail(request) {
        return axiosPostAuthorize(AddEditFinanceAdhokInvoiceDetail, request)
    }
    async getFinanceCreditNoteStatusList(request) {
        return axiosGetAuthorize(GetFinanceCreditNoteStatusList, request);
    }
    async getAllFinanceCreditNoteList(request) {
        return axiosPostAuthorize(GetAllFinanceCreditNoteList, request);
    }
    // For Deferred Income Reports
    async getAllDeferredIncomeReportList(request) {
        return axiosPostAuthorize(GetAllDeferredIncomeReportList, request);
    }
    async downloadSheetByDeferredIncomeReportId(request) {
        return axiosGetFileAuthorizeblob(DownloadSheetByDeferredIncomeReportId, request);
    }
    async generateDeferredIncomeReport(request) {
        return axiosPostAuthorize(GenerateDeferredIncomeReport, request);
    }
    async getFinanceCreditNoteById(request) {
        return axiosGetAuthorize(GetFinanceCreditNoteById, request);
    }
    async getFinanceAdhocInvoiceDetail(request) {
        return axiosGetAuthorize(GetFinanceAdhokInvoiceDetail, request);
    }
    async addEditFinanceGST(request) {
        return axiosPostAuthorize(AddEditFinanceGST, request)
    }
    async addEditFinanceCreditNoteApproval(request) {
        return axiosPostAuthorize(AddEditFinanceCreditNoteApproval, request)
    }
    async addEditFinanceClassCode(request) {
        return axiosPostAuthorize(AddEditFinanceClassCode, request)
    }
    async addEditFinanceAccountCode(request) {
        return axiosPostAuthorize(AddEditFinanceAccountCode, request)
    }
    async getTransactionRecordList(request) {
        return axiosPostAuthorize(GetTransactionRecordList, request);
    }
    async financeApproveRejectCreditNoteApproval(request) {
        return axiosPostAuthorize(FinanceApproveRejectCreditNoteApproval, request);
    }
    async getCreditNoteInfoForCorporateMember(request) {
        return axiosGetMultiParams(GetCreditNoteInfoForCorporateMember, request);
    }

    async financeUpdateCreditNote(request) {
        return axiosPostAuthorize(FinanceUpdateCreditNote, request);
    }

    async downloadSheetByTransactionReportId(request) {
        return axiosGetFileAuthorizeblob(DownloadSheetByTransactionReportId, request);
    }
    async downloadSheetForTransactionRecord(request) {
        return axiosPostFileAuthorizeblob(DownloadSheetForTransactionRecord, request);
    }
    async downloadSheetForXeroInvoiceExtractionRecords(request) {
        return axiosPostFileAuthorizeblob(DownloadSheetForXeroInvoiceExtractionRecords, request);
    }
    async financeAddCreditNotePaymentProofMapping(request) {
        return axiosPostAuthorize(FinanceAddCreditNotePaymentProofMapping, request);
    }
    async financeUpdateStatusForCreditNote(request) {
        return axiosPostAuthorize(FinanceUpdateStatusForCreditNote, request);
    }
    async acceptTotalExternalInvoicePaidAmountInReconciliation(request) {
        return axiosGetAuthorize(AcceptTotalExternalInvoicePaidAmountInReconciliation, request);
    }
    async addEditFinanceExternalServiceDetail(request) {
        return axiosPostAuthorize(AddEditFinanceExternalServiceDetail, request);
    }
    async getFinanceExternalServiceDetailById(request) {
        return axiosGetAuthorize(GetFinanceExternalServiceDetailById, request);
    }
    async addDrawdownForExternalServiceItem(request) {
        return axiosPostAuthorize(AddDrawdownForExternalServiceItem, request);
    }

}