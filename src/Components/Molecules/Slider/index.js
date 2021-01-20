import React from 'react';
import auctionComplete from 'assets/img/auctionComplete.png';
import styled from 'styled-components';
const SliderWrapper = styled.div`
  position: relative;
  overflow: auto;

  width: 100%;
`;
const SliderContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

const SliderImage = styled.img`
  width: 100%;
  height: 100%;
  max-width: ${props => (props.big ? '400px' : '100px')};
  max-height: ${props => (props.big ? '400px' : '100px')};
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

const Slider = ({ ImageList, big, auctionStatus, onRemove, type }) => {
  console.log(ImageList);

  return ImageList ? (
    <SliderWrapper>
      <SliderContainer>
        {ImageList.map((img, index) => {
          console.log(img);
          return type != 'detail' ? (
            <ImgWrapper>
              <RemoveBtn onRemove={onRemove} name={img.name} />
              <SliderImage src={img.src} big={big ? true : false} key={index} />
            </ImgWrapper>
          ) : (
            <SliderImage src={img} big={big ? true : false} key={index} />
          );
        })}
      </SliderContainer>
      {auctionStatus && (
        <Complete>
          <img style={{ width: '20%' }} src={auctionComplete}></img>
        </Complete>
      )}
    </SliderWrapper>
  ) : null;
};

export default Slider;
