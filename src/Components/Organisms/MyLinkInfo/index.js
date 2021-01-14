import React, { useEffect, useState } from 'react';

import { Border } from 'Components/Atoms';
import { List } from 'Components/Molecules';
import styled from 'styled-components';
import { useFetch } from 'Hooks/useFetch';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

const MyLinkWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
`;

const NoHistory = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #a09fa7;
`;

const NoHistoryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 50vh;
  padding: 20px;
`;

const StatusWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  text-align: left;
`;

const StatusText = styled.div`
  color: #6e44ff;
  font-size: 15px;
  flex: 1;
  width: 100%;
`;
const Name = styled.div`
  font-size: 18px;
`;

const ConfirmBtn = styled.button`
  flex: 1;
  width: 100%;
  border: none;
  padding: 10px;
  margin-top: 15px;
  font-size: 18px;
  color: #6e44ff;
  text-align: center;
  background-color: #f5f5f7;
  :link {
    color: #6e44ff;
    text-decoration: none;
  }
`;
const Status = ({ status }) => {
  return (
    <StatusWrapper>
      <StatusText>✓ {status}</StatusText>
    </StatusWrapper>
  );
};
const MyLink = ({ data, selected }) => {
  const history = useHistory();
  const userInfo = useSelector(state => state.user);
  const link = data.url.substring(data.url.lastIndexOf('/'));

  const onClick = e => {
    e.preventDefault();
    if (selected == 'temporary') {
      history.push(`/ProductEnrollment`, {
        templink: link
      });
    } else {
      history.push(`/Product/seller/${userInfo.id}${link}`, {
        before: true
      });
    }
  };

  return (
    <MyLinkWrapper>
      <Status
        status={data.auctionStatus ? data.auctionStatus : data.bidStatus}
      />
      <Name>{data.productName}</Name>
      <ConfirmBtn onClick={onClick}>링크확인</ConfirmBtn>
      <Border height="8px" />
    </MyLinkWrapper>
  );
};

const MyLinkList = ({ linklist, selected }) => {
  return linklist && linklist.length ? (
    <List>
      {linklist.map(item => {
        return <MyLink data={item} selected={selected}></MyLink>;
      })}
    </List>
  ) : (
    <NoHistoryWrapper>
      <NoHistory style={{ color: '#6E44FF', fontSize: 23, padding: 5 }}>
        ´༎ຶਊ ༎ຶ`
      </NoHistory>
      <NoHistory>아직 참여한 이력이 없어요</NoHistory>
    </NoHistoryWrapper>
  );
};

const BtnContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const Btn = styled.button`
  flex: 1;
  padding: 10px;
  :focus {
    outline: none;
  }
  border: ${props => (props.isSelect ? 'solid 1px #a09fa7' : 'none')};
  border-bottom: ${props => (props.isSelect ? 'none' : 'solid 1px #a09fa7')};
  color: ${props => (props.isSelect ? 'black' : '#A09FA7')};
  background-color: ${props => (props.isSelect ? 'white' : '#EAEAEA')};
`;
const MyLinkSelectBtn = ({ selectList, selected, onSelected }) => {
  return (
    <BtnContainer>
      {selectList.map((item, index) => {
        return (
          <Btn
            name={item.status}
            onClick={onSelected}
            isSelect={item.status == selected}
            key={index}
          >
            {item.name}
          </Btn>
        );
      })}
    </BtnContainer>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const MyLinkInfo = () => {
  const userInfo = useSelector(state => state.user);

  const selectList = [
    { name: '입찰', status: 'purchase' },
    { name: '판매', status: 'sale' },
    { name: '임시저장', status: 'temporary' }
  ];
  const [selected, setSelected] = useState(selectList[0].status);
  const [data, isLoading, error, refetch] = useFetch(
    `https://rest.dealink.co.kr/user/${userInfo.id}/${selected}`,
    // `http://192.168.0.102:8080/user/${userInfo.id}/${selected}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        AUTH_TOKEN: userInfo.accessToken
      }
    }
  );
  const onSelected = e => {
    const { name } = e.target;
    setSelected(name);
    refetch(true);
  };

  return (
    <Container>
      <MyLinkSelectBtn
        selectList={selectList}
        selected={selected}
        onSelected={onSelected}
      />
      {isLoading && <MyLinkList linklist={data} selected={selected} />}
    </Container>
  );
};

export default MyLinkInfo;
