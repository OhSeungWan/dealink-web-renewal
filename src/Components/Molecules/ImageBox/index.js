import styled, { css } from 'styled-components';

import { BiPlusMedical } from 'react-icons/bi';
import React from 'react';

const Img = styled.img`
  width: 100%;
  height: 100%;
`;

const ImgContainer = styled.div`
  ${props => {
    if (props.upload) {
      return css`
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 80vw;
        height: 80vh;
        max-width: 400px;
        max-height: 300px;
        border: 1px solid black;
      `;
    }
  }}
`;

const ImageBox = ({ url, type }) => {
  return type == 'upload' ? (
    <ImgContainer upload>
      <BiPlusMedical size={25} />
      <div>0/10</div>
    </ImgContainer>
  ) : (
    <ImgContainer>
      <Img src={url}></Img>
    </ImgContainer>
  );
};

export default ImageBox;
