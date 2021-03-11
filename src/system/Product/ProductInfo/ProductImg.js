import { Slider, Timer } from 'Components/Molecules';

import React from 'react';

const ProductImg = ({ auction }) => {
  return (
    <Slider
      ImageList={auction.imageUrls}
      big
      auctionStatus={auction.auctionStatus}
      type="detail"
    >
      {/* <Timer
        auctionStatus={auction.auctionStatus}
        isSet
        closingTime={auction.closingTime}
      /> */}
    </Slider>
  );
};

export default ProductImg;
