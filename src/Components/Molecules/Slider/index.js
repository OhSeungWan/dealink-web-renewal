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
  width: ${props => (props.big ? '100%' : '30%')};
  height: ${props => (props.big ? '100%' : '30%')};
  max-width: ${props => (props.big ? '400px' : '100px')};
  max-height: ${props => (props.big ? '400px' : '100px')};
`;

const Slider = ({ ImageList, big }) => {
  return ImageList ? (
    <SliderWrapper>
      <SliderContainer>
        {ImageList.map(img => {
          return <SliderImage src={img} big={big ? true : false} />;
        })}
      </SliderContainer>
    </SliderWrapper>
  ) : null;
};

export default Slider;
