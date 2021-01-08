import { request } from 'Apis/Request';
export const auctionApi = {
  getAuction: async (userId, link, option) => {
    return await request(`user/${userId}/auction/${link}`, option);
  },
  registerAuction: async (userId, option) => {
    return await request(`user/${userId}/auction`, option);
  },
  getBidHistory: async (link, option) => {
    return await request(`auction/${link}/history`, option);
  },
  registerBid: async (userId, link, option) => {
    return await request(`user/${userId}/auction/${link}/bid`, option);
  }
};
