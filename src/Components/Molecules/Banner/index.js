import { IoIosArrowDroprightCircle } from 'react-icons/io';
import React from 'react';
import banerTop from 'assets/img/banerTop.png';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
const Wrapper = styled.div`
  max-width: 400px;
`;

// TODO: 페이지별 나타나는 조건 설정해 줘야함

export const BannerTop = ({ type }) => {
  const history = useHistory();
  const onClick = () => {
    history.push('/main');
  };
  return (
    <img
      src={banerTop}
      width="100%"
      height="100%"
      style={{ maxWidth: '400px', maxHeight: 80 }}
    ></img>
  );
};
