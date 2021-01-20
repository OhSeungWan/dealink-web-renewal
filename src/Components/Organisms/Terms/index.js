import React, { useState } from 'react';
import { VscTriangleDown, VscTriangleRight } from 'react-icons/vsc';

import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: #f5f6f7;
  margin-top: 20;
`;

const HeaderWrapper = styled.div`
  display: flex;
  width: 100%;
  padding: 10px 5px 0px 10px;
`;
const HeaderLink = styled.a`
  font-size: 12px;
  display: flex;
  align-items: center;
  :link {
    color: #9fa1a7;
    text-decoration: none;
  }
  :visited {
    color: #9fa1a7;
    text-decoration: none;
  }
  :hover {
    color: #9fa1a7;
    text-decoration: underline;
  }
`;
const TermsHeader = () => {
  return (
    <HeaderWrapper>
      <HeaderLink target="_blank" href={'https://dealink.co.kr/Terms'}>
        이용약관
        <VscTriangleRight size={15} style={{ padding: 10 }} color="#9fa1a7" />
      </HeaderLink>
    </HeaderWrapper>
  );
};
const Title = styled.div`
  font-size: 12px;
  font-weight: 700;
  padding: 10px;
  color: #9fa1a7;
`;
const Contents = styled.div`
  padding: 10px;
  color: #9fa1a7;
  font-size: 13px;
`;

const ViewMore = ({ closeBtn, openBtn, open }) => {
  return open ? (
    <div
      style={{ display: 'flex', paddingLeft: 10, alignItems: 'center' }}
      onClick={closeBtn}
    >
      <div style={{ color: '#9fa1a7', fontSize: 12 }}>사업자 정보</div>
      <VscTriangleDown size={15} style={{ padding: 10 }} color="#9fa1a7" />
    </div>
  ) : (
    <div
      style={{ display: 'flex', paddingLeft: 10, alignItems: 'center' }}
      onClick={openBtn}
    >
      <div style={{ color: '#9fa1a7', fontSize: 12 }}>사업자 정보</div>
      <VscTriangleRight size={15} style={{ padding: 10 }} color="#9fa1a7" />
    </div>
  );
};

const Terms = () => {
  const [open, setOpen] = useState(false);
  const openBtn = () => {
    setOpen(true);
  };
  const closeBtn = () => {
    setOpen(false);
  };
  return (
    <Wrapper>
      <Title>석세스모드</Title>
      <TermsHeader />
      <ViewMore open={open} closeBtn={closeBtn} openBtn={openBtn} />
      {open && (
        <Contents>
          대표이사: 주병천 <br />
          사업자등록번호 : 239-04-01226 <br />
          통신판매업 : 안양동안 - 1226 <br />
          메일 : postmaster@successmode.co.kr <br />
          고객센터 : 239-04-01226 <br />
          주소 : 경기도 안양시 동안구 시민대로 327번길 11-41
          <br />
          호스팅서비스 제공자: 석세스모드 <br />
          전자금융분쟁처리 Tel: 1600-0987 Fax : 0303 3441 8011
        </Contents>
      )}
    </Wrapper>
  );
};

export default Terms;
