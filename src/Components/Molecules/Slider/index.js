import React from 'react';
import auctionComplete from 'assets/img/auctionComplete.png';
import styled from 'styled-components';

const Slider = ({
  ImageList,
  big,
  auctionStatus,
  onRemove,
  type,
  children
}) => {
  return ImageList ? (
    <SliderWrapper>
      <SliderContainer>
        {ImageList.map((img, index) => {
          return type !== 'detail' ? (
            <ImgWrapper>
              <RemoveBtn onRemove={onRemove} name={img.name} />
              <SliderImage src={img.src} big={big ? true : false} key={index} />
            </ImgWrapper>
          ) : (
            <>
              <ImgWrapperBig>
                <SliderImage src={img} big={big ? true : false} key={index} />
              </ImgWrapperBig>
            </>
          );
        })}
      </SliderContainer>
      {auctionStatus !== 'PROCEEDING' && (
        <Complete>
          <img style={{ width: '20%' }} src={auctionComplete} alt="no" />
        </Complete>
      )}
      {children}
    </SliderWrapper>
  ) : null;
};
const SliderWrapper = styled.div`
  position: relative;
  overflow: auto;
  width: 100%;
  /* .imgcount {
    position: absolute;
    top: 10px;
    right: 10px;
  } */
`;
const SliderContainer = styled.div`
  position: relative;
  display: flex;
  overflow: auto;
`;

const SliderImage = styled.img`
  width: ${props => (props.big ? '100vw' : '100%')};
  max-width: 400px;
  height: ${props => (props.big ? '400px' : '100px')};
  max-height: 400px;
`;
const ImgWrapperBig = styled.div`
  position: relative;
  width: 100%;
  height: 400px;
  margin-top: 5px;
`;
const ImgWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: ${props => (props.big ? '400px' : '100px')};
  min-width: 100px;
  max-height: ${props => (props.big ? '400px' : '100px')};
`;

const Btn = styled.button`
  position: absolute;
  top: 0;
  right: 0;
`;
const RemoveBtn = ({ onRemove, name }) => {
  const onClick = () => {
    console.log(name);
    onRemove(name);
  };
  return <Btn onClick={onClick}>x</Btn>;
};
const Complete = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: rgba(232, 225, 220, 0.7);
  position: absolute;
  top: 0;
`;

export default Slider;
