export const auctionApi = {
  getAuction: (userId, url) => {
    return fetch(`http://192.168.0.120:8080/user/${userId}/auction/${url}`);
  }
};
