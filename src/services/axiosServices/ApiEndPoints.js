import { IsProdMode } from "../../utils/AppSetting";

// Web API url
//export const APIURL = (IsProdMode) ? "http://testingimsapi.echemportal.net/api/" : "https://localhost:44321/api/";
// export const APIURL = (IsProdMode) ? process.env.REACT_APP_PreProdApiURL : process.env.REACT_APP_DevApiURL;

export const APIURL = "https://localhost:3000/api/";
// export const APIURL = "https://sfcstagingapi.flyingcapetech.com/api/";


// http://localhost:3000/api/games/all

// PUT http://localhost:3000/api/games/update/{id}
// DELETE http://localhost:3000/api/games/delete/11


//Games services
export const GetAllGameList = "games/all";
export const UpdateGameDetails = "games/update/{id}";
export const DeleteGame = "games/delete/{id}";

//Common Services
export const GetAllAreaOfExpertise = process.env.REACT_APP_GetAllAreaOfExpertise;
export const GetAllBusinessSectors = process.env.REACT_APP_GetAllBusinessSectors;
export const GetAllChapters = process.env.REACT_APP_GetAllChapters;
export const GetAllCountries = process.env.REACT_APP_GetAllCountries;
export const GetAllStatus = process.env.REACT_APP_GetAllStatus;
export const uploadPDF = "Common/UploadPDF";
export const StoreBase64Image = process.env.REACT_APP_StoreBase64Image;
export const GetImage = "Common/GetImage";
export const GetAllDropdownsForCorporateMember = "Common/GetAllDropdownsForCorporateMember";
export const GetPDF = "Common/GetPDF?type={0}&&fileName={1}"
export const DownloadImage = "Common/DownloadImage?type={0}&&fileName={1}"
export const GetPaymentFiles = "Common/GetPaymentFiles?id={0}&&id2={1}"


