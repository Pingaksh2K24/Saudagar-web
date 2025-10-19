import { axiosGetAuthorize, axiosPost, axiosPostAuthorize } from '../AxiosRequests';
import { AddEditAdminDetails, AdminLogin, AzureLogin, ForgotPassword, GetAdminDetailById, GetRolesForAdmin, ResetPassword,GetAdminDetailList,DeleteAdminDetailsById } from '../ApiEndPoints';

export default class AuthenticationServices {

    async adminLogin(request) {
        return axiosPost(AdminLogin, request);
    }
    async addEditAdminDetails(request) {
        return axiosPostAuthorize(AddEditAdminDetails, request);
    }
    async getRolesForAdmin(request) {
        return axiosGetAuthorize(GetRolesForAdmin, request);
    }
    async getAdminDetailById(request) {
        return axiosGetAuthorize(GetAdminDetailById, request);
    }
    async forgotPassword(request) {
        return axiosPost(ForgotPassword, request);
    }
    async resetPassword(request) {
        return axiosPost(ResetPassword, request);
    }
    async azureLogin(request) {
        return axiosPost(AzureLogin, request);
    }
    async getAdminDetailList(request) {
        return axiosPostAuthorize(GetAdminDetailList, request);
    }
    async deleteAdminDetailsById(request) {
        return axiosPostAuthorize(DeleteAdminDetailsById, request);
    }
    async forgotPassword(request) {
        return axiosPost(ForgotPassword, request);
    }
    async resetPassword(request) {
        return axiosPost(ResetPassword, request);
    }
}