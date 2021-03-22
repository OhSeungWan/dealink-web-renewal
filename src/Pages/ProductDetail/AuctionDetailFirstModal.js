import AuctionDetailModal from 'assets/img/AuctionDetailModal.png';
import React from 'react';
import popup1 from 'assets/img/popup1.png';
import popup2 from 'assets/img/popup2.png';
import { setCookie } from 'lib/Cookies';
import styled from 'styled-components';
const iOS = () => {
  return [
    'iPad Simulator',
    'iPhone Simulator',
    'iPod Simulator',
    'iPad',
    'iPhone',
    'iPod',
    'MacIntel'
  ].includes(navigator.platform);
  // ||
  // // iPad on iOS 13 detection
  // (navigator.userAgent.includes('Mac') && 'ontouchend' in document)
};
const AuctionDetailFirstModal = ({ ...props }) => {
  function doNotSeeToday() {
    props.closeModal();
    setCookie('notSeeAgainToday', true, 1);
  }

  const onClick = () => {
    if (iOS()) {
      window.location.href =
        'https://apps.apple.com/kr/app/apple-store/id1552343126';
    } else {
      window.location.href =
        'https://play.google.com/store/apps/details?id=com.dealink';
    }
  };
  return (
    <ModalContainer>
      <div className="wrapper">
        <img src={popup1} width={'90%'} alt="no" onClick={onClick} />
        <img
          src={popup2}
          width={'90%'}
          style={{ marginTop: 5 }}
          onClick={doNotSeeToday}
        />
        {/* <div className="btnWrapper">
          <div className="btn" onClick={doNotSeeToday}>
            오늘하루 그만보기
          </div>
          <div className="btn" onClick={props.closeModal}>
            닫기
          </div>
        </div> */}
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
