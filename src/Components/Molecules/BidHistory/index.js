import React, { useState } from 'react';

import { AiOutlineClose } from 'react-icons/ai';
import { BsTriangleFill } from 'react-icons/bs';
import { Container } from 'Components/Atoms';
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
const HistoryList = ({ link }) => {
  const userInfo = useSelector(state => state.user);
  // const [data, isLoading, error, refetch] = useFetch(
  //   `http://192.168.0.120:8080//auction/${link}/history`,
  //   {
  //     headers: { AUTH_TOKEN: userInfo.accessToken }
  //   }
  // );
  const data = [
    {
      id: null,
      userName: '',
      bidPrice: 1000000,
      createdDate: '2020-12-31T13:21:25.661824'
    }
  ];
  console.log(data);

  return (
    true && (
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

const BidHistory = ({ bidHistoryCount, link }) => {
  const [isOpen, setIsOpen] = useState(false);

  const modalOpen = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    if (bidHistoryCount == 0) {
      alert('현재 입찰건이 존재하지 않습니다.');
      return;
    }
    setIsOpen(false);
  };

  return (
    <>
      <Wrapper onClick={modalOpen}>
        <Text>누적 입찰수</Text>
        <Text style={{ color: 'red' }}>{bidHistoryCount}회</Text>
        <Text style={{ fontSize: 17 }}>
          경매기록 확인
          <IoIosArrowDroprightCircle size={25} />
        </Text>
      </Wrapper>
      <Container>
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
          <HistoryList link={link} />
        </Modal>
      </Container>
    </>
  );
};

export default BidHistory;
