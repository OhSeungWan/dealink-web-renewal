import React, { useEffect, useRef, useState } from 'react';

import AuctionItem from 'system/Auction/AuctionItem';
import styled from 'styled-components';

const AuctionList = () => {
  const [auctionList, setAuctionList] = useState([]);
  const [page, setPage] = useState(0);
  const pageStateRef = useRef(page);

  const setPageState = data => {
    pageStateRef.current = data;
    setPage(data);
  };

  const getAuctionList = async () => {
    const res = await fetch(
      `https://rest.dealink.co.kr/auction/list?page=${pageStateRef.current}&size=20&sort=closingTime,ASC`
    );
    const data = await res.json();
    setAuctionList(list => list.concat(data.content));
  };

  const infiniteScroll = () => {
    let scrollHeight = Math.max(
      document.documentElement.scrollHeight,
      document.body.scrollHeight
    );
    let scrollTop = Math.max(
      document.documentElement.scrollTop,
      document.body.scrollTop
    );
    let clientHeight = document.documentElement.clientHeight;
    if (scrollTop + clientHeight >= scrollHeight) {
      getAuctionList();
    }
  };

  useEffect(() => {
    getAuctionList();
    window.addEventListener('scroll', infiniteScroll, true);
    return () => {
      window.removeEventListener('scroll', infiniteScroll, true);
    };
  }, []);

  useEffect(() => {
    setPageState(page + 1);
  }, [auctionList]);
  return (
    <AuctionListWrapper>
      {auctionList.map(auction => {
        return <AuctionItem auction={auction} />;
      })}
    </AuctionListWrapper>
  );
};

export default AuctionList;

const AuctionListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  width: 100%;
`;
