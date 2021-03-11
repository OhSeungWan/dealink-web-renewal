import { HiUserCircle } from 'react-icons/hi';
import { REQUEST_URL } from 'Constants/server';
import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
const ProductProfile = ({ auction }) => {
  const history = useHistory();
  const userId = sessionStorage.getItem('userId');
  const accessToken = sessionStorage.getItem('accessToken');

  function goProfile(id) {
    history.push(`/profile/${id}`);
  }

  async function openChat() {
    const res = await fetch(
      `${REQUEST_URL}chat-room/${auction.id}/${userId}/${auction.userId}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          AUTH_TOKEN: accessToken
        }
      }
    );
    const data = await res.json();
    history.push(`/chat/${data.roomId}/`);
    console.log(data);
  }
  return (
    <ProductProfileWrapper>
      <div className="wrapper" onClick={() => goProfile(auction.userId)}>
        <HiUserCircle color="#707070" size={50} />
        <div className="name">{auction.userName}</div>
        {/* <AiOutlineRight /> */}
      </div>
      {/* <button className="chatBtn" onClick={openChat}>
        판매자와 1:1 채팅하기
      </button> */}
    </ProductProfileWrapper>
  );
};

const ProductProfileWrapper = styled.div`
  padding-left: 15px;
  padding-top: 15px;
  display: flex;
  align-items: center;
  width: 90%;
  justify-content: space-between;
  .name {
    font-size: 12px;
  }
  .chatBtn {
    border: none;
    padding: 5px;
    color: #6e44ff;
    border: solid 1px #6e44ff;
    border-radius: 5px;
    :focus {
      outline: none;
    }
  }

  .profileBtn {
    padding: 0px 10px;
    border: none;
    color: #6e44ff;
    border: solid 1px #6e44ff;
    border-radius: 5px;
    :focus {
      outline: none;
    }
  }
  .wrapper {
    padding: 5px 10px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export default ProductProfile;
