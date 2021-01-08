import React from 'react';
import styled from 'styled-components';
const SliderWrapper = styled.div`
  overflow: auto;
`;
const SliderContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

const SliderImage = styled.img`
  margin: 0px 10px 0px 10px;
  width: 100%;
  height: 100%;
  max-width: ${props => (props.big ? '400px' : '100px')};
  max-height: ${props => (props.big ? '400px' : '100px')};
`;

const Slider = ({ ImageList, big }) => {
  return ImageList ? (
    <SliderWrapper>
      <SliderContainer>
        {ImageList.map((img, index) => {
          return <SliderImage src={img} big={big ? true : false} key={index} />;
        })}
      </SliderContainer>
    </SliderWrapper>
  ) : null;
};

export default Slider;
