import React, { useState } from 'react';

import styled from 'styled-components';

// #6E44FF
const CheckButtonWrapper = styled.div`
  margin: 5px;
  color: ${props => (props.checked ? '#6E44FF' : '#a09fa7;')};
  width: 100%;
  background-color: #eaeaea;
  border-radius: 5px;
  padding: 10px 20px 10px 20px;
  text-align: center;
  font-size: 20px;
  &:hover {
    cursor: pointer;
  }
`;
const CheckButtonText = styled.p`
  font-size: 20px;
  &:hover {
    cursor: pointer;
  }
`;
export const CheckButton = ({ text, checked }) => {
  const [isCheck, setIsCheck] = useState(checked);
  const clickHandler = () => {
    setIsCheck(isCheck => !isCheck);
  };

  return (
    <CheckButtonWrapper checked={isCheck} onClick={clickHandler}>
      <CheckButtonText>{text}</CheckButtonText>
    </CheckButtonWrapper>
  );
};
