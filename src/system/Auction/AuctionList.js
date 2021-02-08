import React, { useEffect, useRef, useState } from 'react';

import AuctionItem from 'system/Auction/AuctionItem';
import mainbanner from 'assets/img/mainbanner.png';
import styled from 'styled-components';

const AuctionList = () => {
  const [auctionList, setAuctionList] = useState([]);
  const [page, setPage] = useState(0);
  const [sortKey, setSortKey] = useState('createdDate');
  const [loading, setLoading] = useState(false);
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
    const { value } = e.target;
    setSortKey(SortKey[value]);
    const res = await fetch(
      `https://rest.dealink.co.kr/auction/list?page=0&size=20&sort=${SortKey[value]},ASC`
    );
    const data = await res.json();
    setAuctionList(data.content);
    setPageState(1);
    console.log('reset');
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
      <img src={mainbanner} width="100%" />
      <FilterWrapper className="filter-wrapper">
        <div className="title">
          <div>나눔스토리를 </div>
          <div>이웃과 공유하세요</div>
        </div>
        <select name="fruits" onChange={handleChageSortKey}>
          <option value="new">신규 등록순</option>
          <option value="closing">마감 순</option>
          <option value="price">가격 순</option>
        </select>
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
