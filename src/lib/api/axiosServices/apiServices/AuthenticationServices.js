import {
  axiosPost,
  axiosGetAuthorize,
  axiosDeleteAuthorize,
  axiosPostAuthorize,
  axiosPutAuthorize,
} from '../AxiosRequests';
import {
  AdminLogin,
  GetAllUsersList,
  AddNewUser,
  UpdateUserById,
  DeleteUserById,
} from '../ApiEndPoints';

export default class AuthenticationServices {
  async adminLogin(request) {
    return axiosPost(AdminLogin, request);
  }
  async getAllUsersList(request) {
    return axiosGetAuthorize(GetAllUsersList, request);
  }

  async addNewUser(request) {
    return axiosPostAuthorize(AddNewUser, request);
  }

  async updateUserById(request, id) {
    return axiosPutAuthorize(UpdateUserById, request, id);
  }

  async deleteUserById(request) {
    return axiosDeleteAuthorize(DeleteUserById, request);
  }
}
