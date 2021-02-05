import React from 'react';

const AuctionDetailFirstModal = () => {
  return props.isOpen ? (
    <ModalWrapper style={{ backgroundColor: 'rgba(157, 157, 157, 0.7)' }}>
      <div
        style={{
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column'
        }}
      >
        <img src={AuctionDetailModal} width={'90%'} alt="no" />
        {/* <div style={{ position: 'absolute', bottom: 10, display: 'flex' }}> */}
        <div
          style={{
            position: 'absolute',
            left: 35,
            bottom: 10,
            color: 'white'
          }}
          onClick={props.doNotSeeToday}
        >
          오늘하루 그만보기
        </div>
        <div
          style={{
            position: 'absolute',
            right: 35,
            bottom: 10,
            color: 'white'
          }}
          onClick={props.closeModal}
        >
          닫기
        </div>
        {/* </div> */}
      </div>
    </ModalWrapper>
  ) : null;
};

export default AuctionDetailFirstModal;

export const FadeBox = ({ ...props }) => {
  return props.isOpen ? (
    <ModalWrapper style={{ backgroundColor: 'rgba(157, 157, 157, 0.7)' }}>
      <div
        style={{
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column'
        }}
      >
        <img src={AuctionDetailModal} width={'90%'} alt="no" />
        {/* <div style={{ position: 'absolute', bottom: 10, display: 'flex' }}> */}
        <div
          style={{
            position: 'absolute',
            left: 35,
            bottom: 10,
            color: 'white'
          }}
          onClick={props.doNotSeeToday}
        >
          오늘하루 그만보기
        </div>
        <div
          style={{
            position: 'absolute',
            right: 35,
            bottom: 10,
            color: 'white'
          }}
          onClick={props.closeModal}
        >
          닫기
        </div>
        {/* </div> */}
      </div>
    </ModalWrapper>
  ) : null;
};
