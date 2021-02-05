import { BsFillTriangleFill } from 'react-icons/bs';
import React from 'react';
import { TimerItem } from 'Components/Molecules/Timer';
import { comma } from 'lib/Utils/comma-utils';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

const AuctionItem = ({ auction }) => {
  const history = useHistory();
  const onClick = () => {
    history.push(`/Product/seller/0/${auction.url}`);
  };

  return (
    <AcutionItemWrapper onClick={onClick}>
      <div className="item-wrapper">
        <TimerItem
          isSet={true}
          small
          closingTime={auction.closingTime}
          link={auction.url}
        />

        <img className="img" src={auction.imagePath} />
      </div>
      <AuctionItemContents auction={auction} />
    </AcutionItemWrapper>
  );
};

const AuctionItemContents = ({ auction }) => {
  return (
    <div className="contents">
      <AuctionContentItem>{`${auction.productName}`}</AuctionContentItem>
      <AuctionContentItem style={{ fontWeight: 700 }}>{`현재가 ${comma(
        auction.currentPrice
      )}원`}</AuctionContentItem>
      <AuctionContentItem style={{ fontSize: 16, color: 'gray' }}>
        {`시작가 ${comma(auction.startingPrice)}원`}
      </AuctionContentItem>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <AuctionContentItem
          style={{ fontSize: 14 }}
        >{`입찰수 `}</AuctionContentItem>
        <AuctionContentItem
          style={{
            fontSize: 14,
            color: 'red',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          {auction.count} <BsFillTriangleFill />
        </AuctionContentItem>
      </div>
    </div>
  );
};
const AcutionItemWrapper = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .item-wrapper {
    position: relative;
    width: 100%;
    height: 150px;
    overflow: hidden;
    margin-top: 5px;

    .img {
      position: absolute;
      width: 95%;
      height: 200px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }

  .contents {
    padding: 10px;
    border: 1px solid #f5f5f7;
    width: 85%;
    display: flex;
    flex-direction: column;
  }
`;

const AuctionContentItem = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export default AuctionItem;
