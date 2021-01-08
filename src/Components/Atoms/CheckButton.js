import React, { useState } from 'react';

import styled from 'styled-components';

// #6E44FF
const CheckButtonWrapper = styled.div`
  margin: 5px;
  color: ${props => (props.checked ? '#6E44FF' : '#a09fa7;')};
  background-color: #eaeaea;
  border-radius: 5px;
  padding: 5px 20px 5px 20px;
  text-align: center;
  &:hover {
    cursor: pointer;
  }
  flex: 1;
`;
const CheckButtonText = styled.p`
  font-size: 16px;
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
