import { ActiveInActiveCampaign, AddEditMembershipCampaign, GetMembershipCampaignById, GetMembershipCampaignList } from "../ApiEndPoints";
import { axiosGetAuthorize, axiosPostAuthorize } from "../AxiosRequests";


export default class MembershipCampaignServices {

    async addEditMembershipCampaign(request) {
        return axiosPostAuthorize(AddEditMembershipCampaign, request);
    }

    async getMembershipCampaignList(request) {
        return axiosPostAuthorize(GetMembershipCampaignList, request);
    }

    async activeInActiveMembershipCampaign(request) {
        return axiosPostAuthorize(ActiveInActiveCampaign, request);
    }

    async getMembershipCampaign() {
        return axiosGetAuthorize(GetMembershipCampaignById, 1);
    }
}
