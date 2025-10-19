import {
    axiosGetAuthorize,
    axiosPostAuthorize,
    axiosGetAuthorizeMultiParams,
    axiosGetFileAuthorizeblob,
    axiosGetMultiParams,
    axiosGet,
} from '../AxiosRequests';
import {
    GetMembershipCorporateList,
    ActiveInActiveMembershipCorporate,
    GetAllCorporateStatus,
    DeleteMembershipCorporate,
    GetAllDropdownsForCorporateMember,
    GetCorporateEngagementDetailsById,
    GetEngagementTrackingListById,
    AddEditSIISCorporateAccountInformation,
    GetCorporateAccountInformationById,
    GetCorporateMemberById,
    AddEditCorporateEngagementTracking,
    GetCorporateMembershipSubscriptionById,
    GetOrganisationProfileById,
    GetOrganisationKeyRolesListById,
    GetOrganisationKeyRolesById,
    GetEmployeeInfomationForCorporateMemberAdmin,
    AddEditCorporateMembershipSubscription,
    AddEditCorporateCompanyProfile,
    AddEditCorporateOrganisationRole,
    GetCorporateFinancialInfo,
    GetEmployeeInformationById,
    GetCorporateFinanceReceiptInvoice,
    EdiCorporateEmployeeDetails,
    AddEditBusinessPresenceAndMarketInterest,
    GetBusinessPresenceAndMarketInterestById,
    AddEditFinanceCardDetails,
    MarkIndivisualMemberAsNonMember,
    DeleteCorporateOrganisationRole,
    GetCorporateFinanceForCreditNote,
    SearchIndividualMemberByEmailForOrgRole,
    GetCorporateRepresentativeDetailsById,
    AddEditRepresantativeInformationById
} from '../ApiEndPoints'

export default class MembershipCorporateServices {

    async getMembershipCorporateList(request) {
        return axiosPostAuthorize(GetMembershipCorporateList, request)
    }
    async markIndivisualMemberAsNonMember(request) {
        return axiosGetAuthorize(MarkIndivisualMemberAsNonMember, request);
    }
    async deleteCorporateOrganisationRole(request) {
        return axiosPostAuthorize(DeleteCorporateOrganisationRole, request);
    }
    // async activeInActiveCorporateMember(request) {
    //     return axiosPostAuthorize(ActiveInActiveMembershipCorporate, request)
    // }

    async deleteCorporateMember(request) {
        return axiosPostAuthorize(DeleteMembershipCorporate, request)
    }
    async getAllCorporateStatus() {
        return axiosGetAuthorize(GetAllCorporateStatus);
    }
    async activeInActiveCorporateMember(request) {
        return axiosPostAuthorize(ActiveInActiveMembershipCorporate, request)
    }
    async getAllDropdownForCorporateMember(request) {
        return axiosGetAuthorize(GetAllDropdownsForCorporateMember, request);
    }
    //New services for create corporate members
    async addEditSIISCorporateAccountInformation(request) {
        return axiosPostAuthorize(AddEditSIISCorporateAccountInformation, request)
    }
    async getCorporateAccountInformationById(request) {
        return axiosGetAuthorize(GetCorporateAccountInformationById, request)
    }
    async getEngagementTrackingListById(request) {
        return axiosGetAuthorize(GetEngagementTrackingListById, request);
    }
    async getEngagmentDetailsById(request) {
        return axiosGetAuthorize(GetCorporateEngagementDetailsById, request)
    }
    async addEditEngagementTracking(request) {
        return axiosPostAuthorize(AddEditCorporateEngagementTracking, request)
    }
    async getCorporateMemberById(request) {
        return axiosPostAuthorize(GetCorporateMemberById, request)
    }
    async getCorporateMembershipSubscriptionById(request) {
        return axiosGetAuthorize(GetCorporateMembershipSubscriptionById, request)
    }
    async getOrganisationProfileById(request) {
        return axiosPostAuthorize(GetOrganisationProfileById, request)
    }
    async getOrganisationKeyRolesListById(request) {
        return axiosGetAuthorize(GetOrganisationKeyRolesListById, request);
    }
    async getOrganisationKeyRolesById(request) {
        return axiosGetAuthorize(GetOrganisationKeyRolesById, request);
    }
    async getEmployeeList(request) {
        return axiosGetAuthorizeMultiParams(GetEmployeeInfomationForCorporateMemberAdmin, request);
    }
    async getEmployeeInformationById(request) {
        return axiosGetAuthorize(GetEmployeeInformationById, request);
    }
    async addEditCorporateMembershipSubscription(request) {
        return axiosPostAuthorize(AddEditCorporateMembershipSubscription, request)
    }
    async addEditCorporateCompanyProfile(request) {
        return axiosPostAuthorize(AddEditCorporateCompanyProfile, request)
    }
    async addEditOrganisation(request) {
        return axiosPostAuthorize(AddEditCorporateOrganisationRole, request);
    }
    async ediCorporateEmployeeDetails(request) {
        return axiosPostAuthorize(EdiCorporateEmployeeDetails, request);
    }
    async getCorporateFinancialInfo(request) {
        return axiosGetAuthorize(GetCorporateFinancialInfo, request);
    }
    async getCorporateFinanceReceiptInvoice(request) {
        return axiosGetFileAuthorizeblob(GetCorporateFinanceReceiptInvoice, request);
    }
    async GetCorporateFinanceForCreditNote(request) {
        return axiosGetFileAuthorizeblob(GetCorporateFinanceForCreditNote, request);
    }
    async addEditBusinessPresenceAndMarketInterest(request) {
        return axiosPostAuthorize(AddEditBusinessPresenceAndMarketInterest, request);
    }
    async getBusinessPresenceAndMarketInterestById(request) {
        return axiosGetAuthorize(GetBusinessPresenceAndMarketInterestById, request);
    }
    async addEditFinanceCardDetails(request) {
        return axiosPostAuthorize(AddEditFinanceCardDetails, request)
    }
    async searchIndividualMemberByEmailForOrgRole(request) {
        return axiosPostAuthorize(SearchIndividualMemberByEmailForOrgRole, request);
    }
    async getCorporateRepresentativeDetailsById(request){
        return axiosGetAuthorize(GetCorporateRepresentativeDetailsById, request); 
    }
    async addEditRepresantativeInformationById(request) {
        return axiosPostAuthorize(AddEditRepresantativeInformationById, request)
    }

}
