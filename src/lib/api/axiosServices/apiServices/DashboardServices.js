import {
  axiosGet,
  axiosGetAuthorize,
  axiosPostAuthorize,
  axiosPutAuthorize,
  axiosDeleteAuthorize,
} from '../AxiosRequests';
import {
  VillageList,
  TodaysGameResults,
  FetchAdminBids,
  HighRiskBids,
  FetchGamesList,
  GetGameDetailsById,
  AddNewGame,
  UpdateGameById,
  DeleteGameById,
  GetGameRates,
  UpdateGameRates,
  GetTodaysResults,
  GetAllResults,
  DeclareResults,
  GetBidTypes,
  GetAgentList,
  GetAllBids,
  GetWeeklyReport,
  GetGameWiseReport,
  GetAgentWiseReport,
  GetAllReceipts,
  GetReceiptDetails,
} from '../ApiEndPoints';

export default class DashboardServices {
  async getViilegeList(request) {
    return axiosGet(VillageList, request);
  }

  async getTodaysGameResults(request) {
    return axiosGet(TodaysGameResults, request);
  }

  async getAdminBids(request) {
    return axiosPostAuthorize(FetchAdminBids, request);
  }

  async getHighRiskBids(request) {
    return axiosPostAuthorize(HighRiskBids, request);
  }

  async fetchGameList(request) {
    return axiosGet(FetchGamesList, request);
  }

  async getGameDetailsById(request) {
    return axiosGet(GetGameDetailsById, request);
  }

  async addNewGame(request) {
    return axiosPostAuthorize(AddNewGame, request);
  }

  async updateGameById(request, id) {
    return axiosPutAuthorize(UpdateGameById, request, id);
  }

  async deleteGameById(request, id) {
    return axiosDeleteAuthorize(DeleteGameById, request, id);
  }

  async getGameRates(request) {
    return axiosGetAuthorize(GetGameRates, request);
  }

  async updateGameRates(request) {
    return axiosPutAuthorize(UpdateGameRates, request);
  }

  async getTodaysResults(request) {
    return axiosGetAuthorize(GetTodaysResults, request);
  }

  async getAllResults(request) {
    return axiosPostAuthorize(GetAllResults, request);
  }

  async declareResults(request) {
    return axiosPostAuthorize(DeclareResults, request);
  }

  async getBidTypes(request) {
    return axiosGetAuthorize(GetBidTypes, request);
  }

  async getAgentList(request) {
    return axiosGetAuthorize(GetAgentList, request);
  }

  async getAllBids(request) {
    return axiosPostAuthorize(GetAllBids, request);
  }

  async getWeeklyReport(request) {
    return axiosGetAuthorize(GetWeeklyReport, request);
  }

  async getGameWiseReport(request) {
    return axiosGetAuthorize(GetGameWiseReport, request);
  }

  async getAgentWiseReport(request) {
    return axiosPostAuthorize(GetAgentWiseReport, request);
  }

  async getAllReceipts(request) {
    return axiosPostAuthorize(GetAllReceipts, request);
  }

  async getReceiptDetails(receiptId) {
    return axiosGetAuthorize(GetReceiptDetails, receiptId);
  }
}
