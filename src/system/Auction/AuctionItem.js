import React from 'react';
import { TimerItem } from 'Components/Molecules/Timer';
import arrow from 'assets/img/arrow.png';
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
        <div className="bidcount">
          <img src={arrow} height={12} />
          <div>{`${auction.count}건`}</div>
        </div>
      </div>
      <AuctionItemContents auction={auction} />
    </AcutionItemWrapper>
  );
};

const AuctionItemContents = ({ auction }) => {
  return (
    <div className="contents">
      <AuctionContentItem className="name">{`${auction.productName}`}</AuctionContentItem>
      <AuctionContentItem
        className="currentprice"
        style={{ fontWeight: 700 }}
      >{`현재가 ${comma(auction.currentPrice)}원`}</AuctionContentItem>
      <AuctionContentItem className="startprice">
        {`시작가 ${comma(auction.startingPrice)}원`}
      </AuctionContentItem>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      ></div>
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
    height: 170px;
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
    .bidcount {
      position: absolute;
      bottom: 0;
      right: 5px;
      display: flex;
      justify-content: center;
      align-items: center;
      border: 3px solid #ff5800;
      font-size: 12px;
      font-weight: 900;
      color: #ff5800;
      background-color: rgba(250, 248, 247, 0.95);
      padding: 2px 12px;
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
  &.name {
    padding: 7px 0px;
    font-size: 16px;
  }
  &.currentprice {
    font-size: 16px;
  }
  &.startprice {
    font-size: 12px;
    color: gray;
  }
`;

export default AuctionItem;
