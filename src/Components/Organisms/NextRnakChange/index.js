import React, { useEffect, useState } from 'react';

import { Button } from 'Components/Atoms';
import { comma } from 'Utils/comma-utils';
import styled from 'styled-components';
import { useFetch } from 'Hooks/useFetch';
import { useSelector } from 'react-redux';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const RankWrapper = styled.div`
  padding: 10px;
  margin: 10px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 90%;
  background-color: #f5f5f7;
`;
const Nextrankchange = ({ link, closeModal }) => {
  const userInfo = useSelector(state => state.user);
  const [secondExist, setSecondExist] = useState(true);
  const [Highest, setHighest] = useState('');
  const [seconds, setSeconds] = useState('');
  const [isChange, setIsChange] = useState(false);
  const [process, setProcess] = useState(false);
  const [data, isLoading, error, refetch] = useFetch(
    `https://rest.dealink.co.kr/auction/${link}/history`,
    // `http://192.168.0.102:8080/auction/${link}/history`,
    {
      headers: { AUTH_TOKEN: userInfo.accessToken }
    }
  );

  const changeRankHandler = async () => {
    setIsChange(false);
    const res = await fetch(
      `https://rest.dealink.co.kr/user/${userInfo.id}/auction/${link}/next`,
      {
        method: 'POST',
        headers: {
          AUTH_TOKEN: userInfo.accessToken
        }
      }
    );
    setIsChange(true);
  };

  const sortBidList = (a, b) => {
    return parseInt(a.bidPrice) < parseInt(b.bidPrice)
      ? 1
      : parseInt(a.bidPrice) < parseInt(b.bidPrice)
      ? -1
      : 0;
  };
  useEffect(() => {
    if (isLoading) {
      const highest = data.filter(bid => bid.bidStatus == 'HIGHEST');
      const s = data
        .filter(bid => bid.bidStatus != 'CANCEL' && bid.bidStatus != 'HIGHEST')
        .sort(sortBidList);

      if (highest[0]) {
        setHighest(`${comma(highest[0].bidPrice)}원`);
      } else {
        setHighest('');
      }

      if (s[0]) {
        setSeconds(`${comma(s[0].bidPrice)}원`);
      } else {
        setSeconds('차순위 입찰자가 없습니다.');
        setSecondExist(false);
      }
    }
  }, [isLoading, isChange]);

  return (
    isLoading &&
    (!isChange ? (
      <Container>
        <RankWrapper>현재 : {Highest}</RankWrapper>
        <div style={{ color: '#6E44FF' }}>▼</div>
        <RankWrapper style={{ border: 'solid 1px #6E44FF' }}>
          차순위 : {seconds}
        </RankWrapper>
        {!secondExist && (
          <RankWrapper>
            더 이상 변경할 다음 차순위 낙찰자가 없습니다. <br />
            경매를 다시 등록하거나 낙찰자와 거래를 성사하세요.
          </RankWrapper>
        )}
        {secondExist && (
          <>
            <RankWrapper>
              낙찰자와 연락이 닿지 않거나 거래진행이 원할하지 않을 경우, <br />
              거래 상대를 차순위 입찰자로 변경 할 수 있습니다. <br />
              변경된 입찰자에게 낙찰 알림톡이 발송됩니다. <br />
              차순으로 변경을 원하시면 아래 버튼을 눌러 진행하세요.
            </RankWrapper>
            <span style={{ marginTop: 15, padding: 10 }}>
              차순위로 변경하시겠습니까?
            </span>
            <Button primary common onClick={changeRankHandler}>
              동의하고 차순위로 변경하기
            </Button>
          </>
        )}
      </Container>
    ) : (
      <Container
        style={{
          height: '100%'
        }}
      >
        <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            padding: 10,
            fontSize: 25,
            color: '#6E44FF'
          }}
        >
          ₊·*◟(˶╹̆ꇴ╹̆˵)◜‧*･
        </div>
        <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          차순위로 변경이 완료되었습니다.
        </div>
      </Container>
    ))
  );
};

export default Nextrankchange;
