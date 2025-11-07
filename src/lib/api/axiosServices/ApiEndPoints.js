import { IsProdMode } from '../../../utils/AppSetting';

// Web API url
export const APIURL = IsProdMode
  ? 'https://saudagar-backend.onrender.com/api/'
  : 'http://localhost:3000/api/';

// export const APIURL = "https://saudagar-backend.onrender.com/api/";

// Authentication services
export const AdminLogin = 'auth/login';
export const VillageList = 'auth/village-list';
export const GetAllUsersList = 'auth/getAllUserList';
export const AddNewUser = 'auth/register';
export const UpdateUserById = 'auth/users/{0}';
export const DeleteUserById = 'auth/users/{0}';


// Bids services
export const FetchAdminBids = 'bids/fetch-admin-bids';
export const HighRiskBids = 'bids/high-risk-bids';
export const GetGameRates = 'bids/rates/game/{0}';
export const UpdateGameRates = 'bids/update-game-rate';
export const GetBidTypes = 'bids/types';
export const GetAllBids = 'bids/fetch';
export const GetWeeklyReport ='bids/daily-profit-loss';
export const GetGameWiseReport= 'bids/game-wise-earning?date=${0}';
export const GetAgentWiseReport ='bids/agent-performance';

// Games services
export const FetchGamesList = 'games/all';
export const GetGameDetailsById = `games/{0}`;
export const AddNewGame = 'games/add';
export const UpdateGameById = `games/update/{0}`;
export const DeleteGameById = `games/delete/{0}`;

// Results services
export const TodaysGameResults = 'results/today-game-results';
export const GetAllResults = 'results/all-results';
export const GetTodaysResults = 'results/today-results';
export const DeclareResults = 'results/declare';

// Receipts services
export const GetAllReceipts = 'bids/get-all-receipts';
export const GetReceiptDetails = 'bids/receipt-details/{0}';
