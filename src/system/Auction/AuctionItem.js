import { BsFillTriangleFill } from 'react-icons/bs';
import React from 'react';
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
      <AuctionItemImgWrapper>
        <AuctionItemImg src={auction.imagePath} />
      </AuctionItemImgWrapper>
      <AuctionItemContents auction={auction} />
    </AcutionItemWrapper>
  );
};

const AuctionItemContents = ({ auction }) => {
  return (
    <AuctionItemContentsWrapper>
      <AuctionContentItem>{`상품명 ${auction.productName}`}</AuctionContentItem>
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
    </AuctionItemContentsWrapper>
  );
};
const AcutionItemWrapper = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const AuctionItemImgWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 150px;
  overflow: hidden;
  margin-top: 5px;
`;

const AuctionItemImg = styled.img`
  position: absolute;
  width: 95%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const AuctionItemContentsWrapper = styled.div`
  padding: 10px;
  border: 1px solid #f5f5f7;
  width: 85%;
  display: flex;
  flex-direction: column;
`;
const AuctionContentItem = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export default AuctionItem;
