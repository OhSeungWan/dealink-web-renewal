import React, { useState } from 'react';

import { BsTriangleFill } from 'react-icons/bs';
import Date from 'lib/Utils/date-utils';
import { HiUserCircle } from 'react-icons/hi';
import { IoIosArrowDroprightCircle } from 'react-icons/io';
import { Modal } from 'Components/Organisms';
import { REQUEST_URL } from 'Constants/server';
import { ScreenWrapper } from 'Components/Atoms';
import { comma } from 'lib/Utils/comma-utils';
import styled from 'styled-components';
import { useFetch } from 'Hooks/useFetch';
import { useHistory } from 'react-router-dom';
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

const HistoryInfoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  border-bottom: solid 1px #eaeaea;
  align-items: center;
  justify-content: space-around;
  padding: 5px;
  .button {
    border: none;
    padding: 2px;
    border-radius: 4px;
    color: #6e44ff;
    font-size: 10px;
    width: 100%;
  }
  .username {
    font-size: 10px;
  }
  .userinfowrapper {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .porfile {
    margin-right: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const HistoryInfo = ({ item }) => {
  const userInfo = useSelector(state => state.user);
  const history = useHistory();
  console.log(item);

  async function openChat() {
    const res = await fetch(
      `${REQUEST_URL}chat-room/${userInfo.id}/${item.userId}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          AUTH_TOKEN: userInfo.accessToken
        },
        body: JSON.stringify({
          name: item.userName
        })
      }
    );
    const data = await res.json();
    history.push(`/chat/${data.roomId}/`);
    console.log(data);
  }

  function goProfile() {
    history.push(`/profile/${item.userId}`);
  }

  return (
    <HistoryInfoWrapper>
      <div className="item">
        {new Date(item.createdDate).format('yyyy-MM-dd')}
      </div>
      <div className="userinfowrapper">
        <div className="porfile">
          <HiUserCircle size={25} style={{ marginRight: 5 }} color="#6E44FF" />
          <button className="item button" onClick={goProfile}>
            프로필 보기
          </button>
        </div>
        <div>
          <div className="username">{item.userName}</div>
          <button className="item button" onClick={openChat}>
            채팅하기
          </button>
        </div>
      </div>
      <div className="item">{comma(item.bidPrice)} 원 </div>
      <BsTriangleFill color="#FF2F2F" />
    </HistoryInfoWrapper>
  );
};

const HistoryList = ({ data, isLoading }) => {
  return (
    isLoading && (
      <HistoryWrapper>
        {data.map((item, index) => {
          return <HistoryInfo item={item} key={index} />;
        })}
      </HistoryWrapper>
    )
  );
};

const BidHistory = ({ link }) => {
  const [isOpen, setIsOpen] = useState(false);

  const userInfo = useSelector(state => state.user);
  const [data, isLoading] = useFetch(`${REQUEST_URL}auction/${link}/history`, {
    headers: { AUTH_TOKEN: userInfo.accessToken }
  });

  const modalOpen = () => {
    if (data.length === 0) {
      alert('현재 입찰건이 존재하지 않습니다.');
      return;
    }
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    isLoading && (
      <>
        <Wrapper onClick={modalOpen}>
          <Text>누적 관심수</Text>
          <Text style={{ color: 'red' }}>{data.length}회</Text>
          <Text style={{ fontSize: 17 }}>
            경매기록 확인
            <IoIosArrowDroprightCircle size={25} />
          </Text>
        </Wrapper>
        {/* TODO: 수정해야함  */}
        {isOpen && (
          <ScreenWrapper>
            <Modal
              isOpen={isOpen}
              closeModal={closeModal}
              title={'관심 준 사람들'}
              height={60}
            >
              <HistoryList link={link} data={data} isLoading={isLoading} />
            </Modal>
          </ScreenWrapper>
        )}
      </>
    )
  );
};

export default BidHistory;
