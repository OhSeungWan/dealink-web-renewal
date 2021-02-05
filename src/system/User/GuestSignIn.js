import { Container, ScreenWrapper } from 'Components/Atoms';
import React, { useState } from 'react';

import Header from 'system/Header/Header';
import { guest } from 'Store/Slice/userSlice';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

const GuestSignIn = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();
  const handleChangePhoneNumber = e => {
    setPhoneNumber(e.target.value);
  };

  const handleClickConfirm = () => {
    if (phoneNumber == '') {
      alert('휴대폰 번호를 입력해주세요.');
      return;
    }
    const pn = phoneNumber.replace(/\D/g, '');
    alert(pn);
    dispatch(guest(phoneNumber));
    history.push('/');
  };
  return (
    <ScreenWrapper>
      <Header />
      <Container>
        <GuestSignInForm>
          <div>휴대폰 번호</div>
          <input
            placeholder="' - ' 를 제외한 휴대폰 번호를 입력해주세요."
            value={phoneNumber}
            onChange={handleChangePhoneNumber}
          ></input>
          <button onClick={handleClickConfirm}>확인</button>
        </GuestSignInForm>
      </Container>
    </ScreenWrapper>
  );
};

const GuestSignInForm = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;
  width: 100%;
  flex-direction: column;
  input {
    margin-top: 10px;
    width: 70%;
    border: 1px solid gray;
    border-radius: 10px;
    padding: 10px;
  }
  div {
    width: 70%;
  }

  button {
    margin-top: 10px;
    width: 75%;
    padding: 10px;
    border: none;
    background-color: black;
    color: white;
  }
`;

export default GuestSignIn;
