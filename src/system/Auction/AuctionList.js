import React, { useEffect, useRef, useState } from 'react';

import AuctionItem from 'system/Auction/AuctionItem';
import styled from 'styled-components';

const AuctionList = () => {
  const [auctionList, setAuctionList] = useState([]);
  const [page, setPage] = useState(0);
  const [sortKey, setSortKey] = useState('createdDate');
  const pageStateRef = useRef(page);

  const setPageState = data => {
    pageStateRef.current = data;
    setPage(data);
  };
  const handleChageSortKey = async e => {
    const SortKey = {
      new: 'createdDate',
      closing: 'closingTime',
      price: 'currentPrice'
    };
    const { name } = e.target;
    setSortKey(SortKey[name]);
    const res = await fetch(
      `https://rest.dealink.co.kr/auction/list?page=0&size=20&sort=${SortKey[name]},ASC`
    );
    const data = await res.json();
    setAuctionList(data.content);
  };

  const getAuctionList = async () => {
    console.log(pageStateRef.current);
    const res = await fetch(
      `https://rest.dealink.co.kr/auction/list?page=${pageStateRef.current}&size=20&sort=${sortKey},ASC`
    );
    const data = await res.json();
    setPageState(pageStateRef.current + 1);
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

  return (
    <>
      <FilterWrapper className="filter-wrapper">
        <button name="new" onClick={handleChageSortKey}>
          최신 순서
        </button>
        <button name="closing" onClick={handleChageSortKey}>
          마감 순서
        </button>
        <button name="price" onClick={handleChageSortKey}>
          가격 순서
        </button>
      </FilterWrapper>
      <AuctionListWrapper>
        {auctionList.map((auction, index) => {
          return <AuctionItem auction={auction} key={index} loading={index} />;
        })}
      </AuctionListWrapper>
    </>
  );
};

export default AuctionList;

const FilterWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  margin-bottom: 10px;
  button {
    border: none;
    padding: 10px 25px;
    border-radius: 5px;
    background-color: #f5f5f7;
    &:active {
      background: gray;
    }

    &:focus {
      background-color: black;
      color: white;
    }
  }
`;

const AuctionListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  width: 100%;
`;
