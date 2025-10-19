import { axiosGetAuthorize, axiosGetFileAuthorizeblob, axiosGetMultiParams, axiosPostAuthorize } from '../AxiosRequests';
import { AddEditChartsOfAccountCode, DownloadARAgingSheetByARAgingReportId, DownloadGSTSheetByGSTReportId, DownloadSheetByBatchJobId, DownloadSheetByMembershipReportId, DownloadSheetByOrganisationRoleReportId, GenerateARAgingReport, GenerateGSTReport, GenerateMembershipReport, GenerateMonthlyBatchJob, GenerateOrganisationRoleReport, GenerateWeeklyBatchJob, GetAllARAgingReportList, GetAllChartsOfAccountCodeList, GetAllDropdownsForBatchJob, GetAllGSTReportList, GetAllMembershipReportList, GetAllMonthlyBatchJobRecords, GetAllOrganisationRoleReportList, GetAllWeeklyBatchJobRecords ,GetAllWeeklyPaymentRecociliationRecords,GenerateWeeklyPaymentReconciliation,DownloadSheetByXeroPaymentReconciliationId} from '../ApiEndPoints';

export default class BatchJobExtractionServices {
    async getAllWeeklyBatchJobRecords(request) {
        return axiosPostAuthorize(GetAllWeeklyBatchJobRecords, request)
    }

    async getAllMonthlyBatchJobRecords(request) {
        return axiosPostAuthorize(GetAllMonthlyBatchJobRecords, request)
    }

    async generateWeeklyBatchJob(request) {
        return axiosGetAuthorize(GenerateWeeklyBatchJob, request)
    }

    async generateMonthlyBatchJob(request) {
        return axiosGetAuthorize(GenerateMonthlyBatchJob, request)
    }

    async downloadSheetByBatchJobId(request) {
        return axiosGetFileAuthorizeblob(DownloadSheetByBatchJobId, request);
    }

    // Charts of Account Services
    async getAllChartsOfAccountCodeList(request) {
        return axiosPostAuthorize(GetAllChartsOfAccountCodeList, request);
    }
    async getAllDropdownsForBatchJob(request) {
        return axiosGetAuthorize(GetAllDropdownsForBatchJob, request);
    }
    async addEditChartsOfAccountCode(request) {
        return axiosPostAuthorize(AddEditChartsOfAccountCode, request);
    }

    // For Membership Reports
    async generateMembershipReport(request) {
        return axiosPostAuthorize(GenerateMembershipReport, request);
    }
    async getAllMembershipReportList(request) {
        return axiosPostAuthorize(GetAllMembershipReportList, request);
    }
    async downloadSheetByMembershipReportId(request) {
        return axiosGetFileAuthorizeblob(DownloadSheetByMembershipReportId, request);
    }


    // For AR Aging Reports
    async getAllARAgingReportList(request) {
        return axiosPostAuthorize(GetAllARAgingReportList, request);
    }
    async generateARAgingReport(request) {
        return axiosPostAuthorize(GenerateARAgingReport, request);
    }
    async downloadARAgingSheetByARAgingReportId(request) {
        return axiosGetFileAuthorizeblob(DownloadARAgingSheetByARAgingReportId, request);
    }

    // For GST Reports
    async getAllGSTReportList(request) {
        return axiosPostAuthorize(GetAllGSTReportList, request);
    }
    async generateGSTReport(request) {
        return axiosPostAuthorize(GenerateGSTReport, request);
    }
    async downloadGSTSheetByGSTReportId(request) {
        return axiosGetFileAuthorizeblob(DownloadGSTSheetByGSTReportId, request);
    }

    // For Organisation Role Reports
    async generateOrganisationRoleReport(request) {
        return axiosPostAuthorize(GenerateOrganisationRoleReport, request);
    }
    async getAllOrganisationRoleReportList(request) {
        return axiosPostAuthorize(GetAllOrganisationRoleReportList, request);
    }
    async downloadSheetByOrganisationRoleReportId(request) {
        return axiosGetFileAuthorizeblob(DownloadSheetByOrganisationRoleReportId, request);
    }


    async GetAllWeeklyPaymentRecociliationRecords(request) {
        return axiosPostAuthorize(GetAllWeeklyPaymentRecociliationRecords, request)
    }

    async GenerateWeeklyPaymentReconciliation(request) {
        return axiosGetAuthorize(GenerateWeeklyPaymentReconciliation, request)
    }

    async DownloadSheetByXeroPaymentReconciliationId(request) {
        return axiosGetFileAuthorizeblob(DownloadSheetByXeroPaymentReconciliationId, request);
    }
}