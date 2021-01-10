import React, { useState } from 'react';

import styled from 'styled-components';

// #6E44FF
const CheckButtonWrapper = styled.div`
  margin: 10px;
  background-color: #eaeaea;
  border-radius: 5px;
  padding: 5px 20px 5px 20px;
  text-align: center;
  &:hover {
    cursor: pointer;
  }
  flex: 1;
`;
const CheckButtonText = styled.div`
  margin: 10px 0px 10px 0px;
  font-size: 16px;
  color: ${props => (props.checked ? '#6E44FF' : '#a09fa7;')};
  &:hover {
    cursor: pointer;
  }
`;
export const CheckButton = ({ text, checked, onClick, name, overlapping }) => {
  const [isCheck, setIsCheck] = useState(false);
  const clickHandler = () => {
    setIsCheck(!isCheck);
  };
  return overlapping ? (
    <CheckButtonWrapper>
      <CheckButtonText name={name} checked={isCheck} onClick={clickHandler}>
        {text}
      </CheckButtonText>
    </CheckButtonWrapper>
  ) : (
    <CheckButtonWrapper>
      <CheckButtonText name={name} checked={checked == name} onClick={onClick}>
        {text}
      </CheckButtonText>
    </CheckButtonWrapper>
  );
};
