import {  axiosGet, axiosGetAuthorize, axiosGetAuthorizeMultiParams, axiosGetMultiParams, axiosPostAuthorize } from '../AxiosRequests';
import {
    GetAllTagList,
    GetAllTagTypeDropdown,
    DeleteTags,
    GetTagDetailById,
    AddEditTag,
    GetAllProjectTypeDropdown,
    GetEmailTemplateList,
    DeleteEmailTemplate,
    GetEmailTemplateById,
    AddEditEmailTemplate,
    GetDropdownRecordList,
    GetDropdownDatabyId,
    DeleteDropdownData,
    AddEditDropdownData,
    GetTableDataById,
} from '../ApiEndPoints';

export default class FieldManagementServices {

    async getAllTagList(request) {
        return axiosPostAuthorize(GetAllTagList, request)
    }

    async getAllTagTypeDropdown() {
        return axiosGetAuthorize(GetAllTagTypeDropdown);
    }

    async deleteTags(request) {
        return axiosPostAuthorize(DeleteTags, request)
    }

    async getTagDetailById(request) {
        return axiosGetAuthorize(GetTagDetailById, request);
    }

    async addEditTag(request) {
        return axiosPostAuthorize(AddEditTag, request)
    }

    async getEmailTemplateList(request) {
        return axiosPostAuthorize(GetEmailTemplateList, request)
    }

    async getAllProjectTypeDropdown(request) {
        return axiosGetAuthorize(GetAllProjectTypeDropdown, request)
    }

    async deleteEmailTemplate(request) {
        return axiosPostAuthorize(DeleteEmailTemplate, request)
    }

    async getEmailTemplateById(request) {
        return axiosGetAuthorize(GetEmailTemplateById, request);
    }

    async addEditEmailTemplate(request) {
        return axiosPostAuthorize(AddEditEmailTemplate, request)
    }

    async getDropdownRecordList(request) {
        return axiosGet(GetDropdownRecordList, request)
    }

    async getDropdownDataById(request) {
        return axiosGetAuthorize(GetDropdownDatabyId, request);
    }

    async deleteDropdownData(request) {
        return axiosPostAuthorize(DeleteDropdownData, request)
    }

    async addEditDropdownData(request) {
        return axiosPostAuthorize(AddEditDropdownData, request)
    }

    async getTableDataById(request) {
        return axiosGetAuthorizeMultiParams(GetTableDataById, request);
    }

}