import AuctionDetailModal from 'assets/img/AuctionDetailModal.png';
import React from 'react';
import { setCookie } from 'lib/Cookies';
import styled from 'styled-components';

const AuctionDetailFirstModal = ({ ...props }) => {
  function doNotSeeToday() {
    props.closeModal();
    setCookie('notSeeAgainToday', true, 1);
  }
  return (
    <ModalContainer>
      <div className="wrapper">
        <img src={AuctionDetailModal} width={'90%'} alt="no" />
        <div className="btnWrapper">
          <div className="btn" onClick={doNotSeeToday}>
            오늘하루 그만보기
          </div>
          <div className="btn" onClick={props.closeModal}>
            닫기
          </div>
        </div>
      </div>
    </ModalContainer>
  );
};

const ModalContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(157, 157, 157, 0.5);
  justify-content: center;
  align-items: center;
  z-index: 9999;

  .wrapper {
    max-width: 400px;
    display: flex;
    flex-direction: column;
    position: absolute;
    bottom: 20%;
    justify-content: center;
    align-items: center;
  }
  .btnWrapper {
    position: absolute;
    display: flex;
    justify-content: space-between;
    width: 90%;
    bottom: 1%;
    align-items: center;
  }
  .btn {
    padding: 5px 5px;
    margin: 0px 10px;
    font-size: 12px;
  }
`;
export default AuctionDetailFirstModal;
