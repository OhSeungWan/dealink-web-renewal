import { Modal } from 'Components/Organisms';
import React from 'react';
import { Share } from 'Components/Molecules';
import shareAuction from 'assets/img/shareAuction.png';
import styled from 'styled-components';
const ModalContentWrapper = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ModalContentText = styled.div`
  font-size: 30px;
  color: #6e44ff;
`;
const ModalLinkDescriptionWrapper = styled.div`
  display: flex;
  width: 100%;
  padding: 20px;
`;

const ModalShareWrapper = styled.div`
  display: flex;
  width: 100%;
`;

const AuctionRegisterModal = ({ modalData, isOpen, closeModal }) => {
  return (
    <Modal isOpen={isOpen} closeModal={closeModal}>
      {modalData && (
        <ModalContentWrapper>
          <ModalContentText style={{ margin: 20 }}>(ஐ╹◡╹)ノ</ModalContentText>
          <ModalContentText>상품등록 완료</ModalContentText>
          <ModalLinkDescriptionWrapper>
            <ModalContentText
              style={{ fontWeight: 700, flex: 1, minWidth: 50, fontSize: 14 }}
            >
              상품명
            </ModalContentText>
            <ModalContentText
              style={{
                flex: 7,
                textAlign: 'center',
                fontSize: 14,
                color: '#605F65'
              }}
            >
              {modalData.name}
            </ModalContentText>
          </ModalLinkDescriptionWrapper>
          <img src={shareAuction} width={'100%'} alt="no" />
          <ModalShareWrapper>
            <Share
              url={`https://www.dealink.co.kr/Product/seller/0/${modalData.url}`}
              // url={`http://192.168.0.102:8080/Product/seller/0/${data.url}`}
              data={modalData}
            />
          </ModalShareWrapper>
          <ModalContentText style={{ color: '#6E44FF', fontSize: 14 }}>
            생성된 링크 들은 '내링크 관리'에서 확인할 수 있습니다.
          </ModalContentText>
        </ModalContentWrapper>
      )}
    </Modal>
  );
};

export default AuctionRegisterModal;
