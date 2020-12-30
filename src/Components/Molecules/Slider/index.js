import React from 'react';
import styled from 'styled-components';
const SliderWrapper = styled.div`
  width: 100%;
  overflow: auto;
`;
const SliderContainer = styled.div`
  width: 100%;
  display: flex;
`;

const SliderImage = styled.img`
  margin: 10px;
  width: 30%;
  height:30%
  max-width: 100px;
  max-height:100px;
`;

const Slider = ({ ImageList }) => {
  console.log(ImageList);
  return ImageList ? (
    <SliderWrapper>
      <SliderContainer>
        {ImageList.map(img => {
          return <SliderImage src={img} />;
        })}
      </SliderContainer>
    </SliderWrapper>
  ) : null;
};

export default Slider;
