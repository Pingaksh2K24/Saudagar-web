import { AddEditEntryDetails, AddEditEntryLessonTimeSlotDetails, AddEditFormQuestion, AddEditOtherEntryDetails, DeleteEntryTimeSlotById, GetAllDropDownForEntryManagement, GetEntryDetailList, GetEntryDetailsById, GetFormQuestionByEventId, GetLessonTimeSlotDetailsById, GetOtherEntryDetailsByEventId, GetEntryPricingDetail, AddEditEntryPricingDetail, GetAllDropDownForCampaignTagging, GetCampaignTaggingDetailsByEventId, AddEditCampaignTaggingDetails, DeleteEntryPricingPackage, GetLocationAreaByPostalCode, GetSGTechAddressesForEntries, UpdateLessonDetailsById, GetEntryProgrammeDetailById, AddEditEntryProgrammeDetail, AddEditEventSectionDetails, GetEventSectionDetails, AddEditEventFormPriceList, GetPriceDetailsForFormByEventId, GetAllMarketingTrackingURList, GetAllMarketingTrackingURLPartnerList, GetAllMarketingTrackingURLEventList, AddEditMarketingTrackingURL, DeleteMarketingTrackingURL, GetMarketingTrackingURLDetailById, GetEntryTimeSlotDetailForTaggingByEventId, DeleteEventQuestionById, DeleteEventAnswerById, DeleteSpeakerById, DeleteProgrammeTimeById, DeleteAdditionalDescriptionById, DeleteEntryDetailsByIds, GetFeedbackQuestionEntryDetailList, GetAllFeedbackAnswerListByEventId, GetFormQuestionAnswerEntryDetailList, GetAllFormQuestionAnswerListByEventId } from "../ApiEndPoints";
import { axiosGetAuthorize, axiosGetFileAuthorizeblob, axiosPostAuthorize } from '../AxiosRequests';


export default class EntryManagementServices {
    async addEditEntryDetails(request) {
        return axiosPostAuthorize(AddEditEntryDetails, request);
    }


    async getEntryDetailsById(request) {
        return axiosGetAuthorize(GetEntryDetailsById, request);
    }

    async getLessonTimeSlotDetailsById(request) {
        return axiosGetAuthorize(GetLessonTimeSlotDetailsById, request);
    }
    async deleteEntryTimeSlotById(request) {
        return axiosPostAuthorize(DeleteEntryTimeSlotById, request);
    }
    async addEditOtherEntryDetails(request) {
        return axiosPostAuthorize(AddEditOtherEntryDetails, request);
    }
    async addEditFormQuestion(request) {
        return axiosPostAuthorize(AddEditFormQuestion, request);
    }
    async getFormQuestionByEventId(request) {
        return axiosGetAuthorize(GetFormQuestionByEventId, request);
    }
    async getOtherEntryDetailsByEventId(request) {
        return axiosGetAuthorize(GetOtherEntryDetailsByEventId, request);
    }
    async addEditEntryLessonTimeSlotDetails(request) {
        return axiosPostAuthorize(AddEditEntryLessonTimeSlotDetails, request);
    }
    async getEntryPricingDetail(request) {
        return axiosPostAuthorize(GetEntryPricingDetail, request)
    }
    async addEditEntryPricingDetail(request) {
        return axiosPostAuthorize(AddEditEntryPricingDetail, request)
    }
    

    async deleteEntryPricingPackage(request) {
        return axiosPostAuthorize(DeleteEntryPricingPackage, request)
    }

    async getLocationAreaByPostalCode(request) {
        return axiosGetAuthorize(GetLocationAreaByPostalCode, request);
    }

    async getSGTechAddressesForEntries(request) {
        return axiosGetAuthorize(GetSGTechAddressesForEntries, request);
    }

    async updateLessonDetailsById(request) {
        return axiosGetAuthorize(UpdateLessonDetailsById, request);
    }

    async getEntryProgrammeDetailById(request) {
        return axiosGetAuthorize(GetEntryProgrammeDetailById, request);
    }
    async addEditEntryProgrammeDetail(request) {
        return axiosPostAuthorize(AddEditEntryProgrammeDetail, request);
    }
    async addEditEventSectionDetails(request) {
        return axiosPostAuthorize(AddEditEventSectionDetails, request);
    }
    async getEventSectionDetails(request) {
        return axiosGetAuthorize(GetEventSectionDetails, request);
    }
    async addEditEventFormPriceList(request) {
        return axiosPostAuthorize(AddEditEventFormPriceList, request);
    }
    async getPriceDetailsForFormByEventId(request) {
        return axiosGetAuthorize(GetPriceDetailsForFormByEventId, request);
    }
 
    async deleteEventQuestionById(request) {
        return axiosGetAuthorize(DeleteEventQuestionById, request);
    }
    async deleteEventAnswerById(request) {
        return axiosGetAuthorize(DeleteEventAnswerById, request);
    }
    async deleteSpeakerById(request) {
        return axiosGetAuthorize(DeleteSpeakerById, request);
    }
    async deleteAdditionalDescriptionById(request) {
        return axiosGetAuthorize(DeleteAdditionalDescriptionById, request);
    }
    async deleteProgrammeTimeById(request) {
        return axiosGetAuthorize(DeleteProgrammeTimeById, request);
    }

    //// Market URL page
    async getAllMarketingTrackingURList(request) {
        return axiosPostAuthorize(GetAllMarketingTrackingURList, request); // 
    }

    async getAllMarketingTrackingURLPartnerList(request) {
        return axiosGetAuthorize(GetAllMarketingTrackingURLPartnerList, request);
    }

    async addEditMarketingTrackingURL(request) {
        return axiosPostAuthorize(AddEditMarketingTrackingURL, request);
    }
    async deleteMarketingTrackingURL(request) {
        return axiosGetAuthorize(DeleteMarketingTrackingURL, request);
    }

    async getMarketingTrackingURLDetailById(request) {
        return axiosGetAuthorize(GetMarketingTrackingURLDetailById, request);
    }

    async getAllMarketingTrackingURLEventList(request) {
        return axiosGetAuthorize(GetAllMarketingTrackingURLEventList, request);
    }

    /// Event Feedback Question
    async getAllDropDownForEntryManagement(request) {
        return axiosGetAuthorize(GetAllDropDownForEntryManagement, request);
    }

    async getFeedbackQuestionEntryDetailList(request) {
        return axiosPostAuthorize(GetFeedbackQuestionEntryDetailList, request);
    }

    async getAllFeedbackAnswerListByEventId(request) {
        return axiosGetFileAuthorizeblob(GetAllFeedbackAnswerListByEventId, request);
    }

    //  Form Question Answer 
    async getFormQuestionAnswerEntryDetailList(request) {
        return axiosPostAuthorize(GetFormQuestionAnswerEntryDetailList, request);
    }
    async getAllFormQuestionAnswerListByEventId(request) {
        return axiosGetFileAuthorizeblob(GetAllFormQuestionAnswerListByEventId, request);
    }

    // View Edit Entries
    async getEntryDetailList(request) {
        return axiosPostAuthorize(GetEntryDetailList, request);
    }

    async deleteEntryDetailsByIds(request) {
        return axiosPostAuthorize(DeleteEntryDetailsByIds, request);
    }

    // Category Campaign Tagging
    async getEntryTimeSlotDetailForTaggingByEventId(request) {
        return axiosGetAuthorize(GetEntryTimeSlotDetailForTaggingByEventId, request);
    }

    async getAllDropDownForCampaignTagging(request) {
        return axiosGetAuthorize(GetAllDropDownForCampaignTagging, request);
    }

    async getCampaignTaggingDetailsByEventId(request) {
        return axiosGetAuthorize(GetCampaignTaggingDetailsByEventId, request);
    }

    async addEditCampaignTaggingDetails(request) {
        return axiosPostAuthorize(AddEditCampaignTaggingDetails, request);
    }
}
