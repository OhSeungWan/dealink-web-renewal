import Event from 'assets/img/Event.png';
import React from 'react';
import { TimerItem } from 'Components/Molecules/Timer';
import arrow from 'assets/img/arrow.png';
import { comma } from 'lib/Utils/comma-utils';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

const AuctionItem = ({ auction, type }) => {
  const history = useHistory();
  const onClick = () => {
    if (type === 'Event') {
      alert('준비중입니다');
      return;
    }
    history.push(`/Product/info/0/${auction.url}`);
  };

  return (
    <AcutionItemWrapper onClick={onClick} type={type}>
      <div className="item-wrapper">
        {/* <TimerItem
          isSet={true}
          small
          closingTime={
            type === 'Event' ? '2021-03-09 20:57:58' : auction.closingTime
          }
          link={type === 'Event' ? 'Event' : auction.url}
        /> */}

        <img
          className="img"
          src={type === 'Event' ? Event : auction.imagePath}
        />
        <div className="bidcount">
          {type !== 'Event' && <img src={arrow} height={12} />}
          <div>{type === 'Event' ? '이벤트' : `${auction.count}건`}</div>
        </div>
      </div>
      <AuctionItemContents auction={auction} type={type} />
    </AcutionItemWrapper>
  );
};

const AuctionItemContents = ({ auction, type }) => {
  return (
    <div className="contents">
      <AuctionContentItem className="name">
        {type === 'Event' ? '0원 공짜 이벤트' : `${auction.productName}`}
      </AuctionContentItem>
      <AuctionContentItem className="currentprice" style={{ fontWeight: 700 }}>
        {type === 'Event'
          ? '진행중인 이벤트'
          : `가격 ${comma(auction.startingPrice)}원`}
      </AuctionContentItem>
      <AuctionContentItem className="startprice">
        {/* {type === 'Event' && '랜덤으로 전 상품 무료 증정!'} */}
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
  height: 100%;
  .profileImg {
    border-radius: 5px;
    width: 100%;
    height: 0;
    position: relative;
    background-size: 100% 100%;
    background-image: url(${props => props.profileImagePath});
    padding-bottom: 100%;
  }
  .item-wrapper {
    position: relative;
    width: 100%;
    height: 210px;
    overflow: hidden;
    width: 100%;
    padding-bottom: 100%;
    height: 0;

    .img {
      border: ${props => (props.type ? 'solid 5px #6E44FF' : 'none')};
      position: absolute;
      width: 95%;
      height: 95%;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    .bidcount {
      position: absolute;
      bottom: 5px;
      right: 5px;
      display: flex;
      justify-content: center;
      align-items: center;
      border: 1px solid #ff5800;
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
