import Banner1 from 'assets/img/Banner1.png';
import Banner2 from 'assets/img/panmeza.png';
import { Border } from 'Components/Atoms';
import { ImageBox } from 'Components/Molecules';
import React from 'react';
import eventBanner from 'assets/img/eventBanner.png';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const MainTopBanner = () => {
  const userInfo = useSelector(state => state.user);
  const location = useLocation();
  const pathname = location.pathname;
  const bannerImg =
    pathname == '/Main'
      ? eventBanner
      : pathname == '/Survey'
      ? Banner2
      : Banner1;
  return (
    <>
      {!userInfo.isLogin && <ImageBox url={bannerImg} />}
      {pathname != '/Survey' && (
        <>
          {/* <TextTitle>중고품 경매 커뮤니티</TextTitle>
          <Text>
            딜링크는 중고로 팔고싶은 상품을 공유하는 커뮤니티 입니다. 링크로 내
            상품을 친구에게 공유해보세요!
          </Text> */}
        </>
      )}
      <Border height={'8px'} />
      <div style={{ fontSize: 20, fontWeight: 400 }}>딜링크에 상품등록</div>
      <Border height={'1px'} />
    </>
  );
};

// const TextTitle = styled.div`
//   width: 100%fit-content;
//   font-size: 18px;
//   margin: 10px 10px;
//   font-weight: 500;
// `;

// const Text = styled.div``;
export default MainTopBanner;
