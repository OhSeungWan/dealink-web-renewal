import React, { useEffect, useRef, useState } from 'react';

import AuctionItem from 'system/Auction/AuctionItem';
import { REQUEST_URL } from 'Constants/server';
import acamain from 'assets/img/acamain.png';
import mainbanner from 'assets/img/mainbanner.png';
import styled from 'styled-components';

const AuctionList = () => {
  const [auctionList, setAuctionList] = useState([]);
  const [page, setPage] = useState(0);
  const [sortKey, setSortKey] = useState({ key: 'createdDate', order: 'ASC' });
  const pageStateRef = useRef(page);

  const setPageState = data => {
    pageStateRef.current = data;
    setPage(data);
  };
  const handleChageSortKey = async e => {
    const SortKey = {
      new: { key: 'createdDate', order: 'DESC' },
      closing: { key: 'closingTime', order: 'ASC' },
      price: { key: 'currentPrice', order: 'ASC' }
    };
    const { value } = e.target;
    setSortKey(SortKey[value]);
    const res = await fetch(
      `${REQUEST_URL}auction/list?page=0&size=20&sort=${SortKey[value].key},${SortKey[value].order}`
    );
    const data = await res.json();
    setAuctionList(data.content);
    setPageState(1);
    console.log('reset');
  };

  const getAuctionList = async () => {
    console.log(pageStateRef.current);
    const res = await fetch(
      `${REQUEST_URL}auction/list?page=${pageStateRef.current}&size=20&sort=${sortKey.key},${sortKey.order}`
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
      <img src={acamain} width="100%" />
      <FilterWrapper className="filter-wrapper">
        <div className="title">
          <div>우리 사무실엔 </div>
          <div>이런 것도 있다!</div>
        </div>
        <select name="fruits" onChange={handleChageSortKey}>
          <option value="new">신규 등록순</option>
          <option value="closing">마감 순</option>
          <option value="price">가격 순</option>
        </select>
      </FilterWrapper>
      <AuctionListWrapper>
        <AuctionItem type="Event" />
        {auctionList.map((auction, index) => {
          return <AuctionItem auction={auction} key={index} loading={index} />;
        })}
      </AuctionListWrapper>
    </>
  );
};

export default AuctionList;

const FilterWrapper = styled.div`
  width: 95%;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 10px;
  .title {
    font-size: 20px;
    font-weight: 500;
    margin-top: 30px;
  }
  select {
    max-height: 40px;
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
