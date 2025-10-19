import { AddMembershipPricing, GetMembershipPricing } from "../ApiEndPoints";
import { axiosGetAuthorize, axiosPostAuthorize } from "../AxiosRequests";

export default class MembershipPricingServices {
    async addEditMembershipPricing(request) {
        return axiosPostAuthorize(AddMembershipPricing, request);
    }
    async getMembershipPricing() {
        return axiosGetAuthorize(GetMembershipPricing, 1);
    }
}