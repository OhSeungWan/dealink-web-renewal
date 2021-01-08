import React, { useEffect, useState } from 'react';

import { AiOutlineClose } from 'react-icons/ai';
import { BsTriangleFill } from 'react-icons/bs';
import Date from 'Utils/date-utils';
import { IoIosArrowDroprightCircle } from 'react-icons/io';
import { Modal } from 'Components/Organisms';
import { comma } from 'Utils/comma-utils';
import styled from 'styled-components';
import { useFetch } from 'Hooks/useFetch';
//TODO: 토큰없이 접근 가능하도록 고쳐야함
import { useSelector } from 'react-redux';

const Wrapper = styled.div`
  flex: 1;
  background-color: rgba(232, 225, 220, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 15px 10px 15px;
`;

const Text = styled.div`
  padding: 10px 15px 10px 15px;
  display: flex;
  font-size: 16px;
  align-items: center;
`;

const HistoryWrapper = styled.div`
  width: 100%;
`;

const HistoryItem = styled.div`
  flex: 1;
  padding: 10px;
`;

const HistoryInfoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  border-bottom: solid 1px #eaeaea;
  align-items: center;
`;

const HistoryInfo = ({ item }) => {
  return (
    <HistoryInfoWrapper>
      <HistoryItem>
        {new Date(item.createdDate).format('yyyy-MM-dd')}
      </HistoryItem>
      <HistoryItem>{comma(item.bidPrice)} 원 </HistoryItem>
      <BsTriangleFill color="#FF2F2F" />
    </HistoryInfoWrapper>
  );
};
const HistoryList = ({ link, data, isLoading }) => {
  return (
    isLoading && (
      <HistoryWrapper>
        {data
          .map((item, index) => {
            return <HistoryInfo item={item} key={index} />;
          })
          .reverse()}
      </HistoryWrapper>
    )
  );
};

const BidHistory = ({ link }) => {
  const [isOpen, setIsOpen] = useState(false);

  const userInfo = useSelector(state => state.user);
  const [data, isLoading, error, refetch] = useFetch(
    `https://rest.dealink.co.kr/auction/${link}/history`,
    // `http://192.168.0.102:8080/auction/${link}/history`,
    {
      headers: { AUTH_TOKEN: userInfo.accessToken }
    }
  );

  const modalOpen = () => {
    if (data.length == 0) {
      alert('현재 입찰건이 존재하지 않습니다.');
      return;
    }
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  //TODO: 누적입찰수 리셋하는 타이머
  // useEffect(() => {
  //   const countdown = setInterval(async () => {
  //     refetch(true);
  //   }, 3000);

  //   return () => clearInterval(countdown);
  // }, []);

  return (
    isLoading && (
      <>
        <Wrapper onClick={modalOpen}>
          <Text>누적 입찰수</Text>
          <Text style={{ color: 'red' }}>{data.length}회</Text>
          <Text style={{ fontSize: 17 }}>
            경매기록 확인
            <IoIosArrowDroprightCircle size={25} />
          </Text>
        </Wrapper>
        <Modal isOpen={isOpen}>
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              marginBottom: 10
            }}
          >
            <div>경매기록 </div>
            <AiOutlineClose size={20} onClick={closeModal} />
          </div>
          <HistoryList link={link} data={data} isLoading={isLoading} />
        </Modal>
      </>
    )
  );
};

export default BidHistory;
