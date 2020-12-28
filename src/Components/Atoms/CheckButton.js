import React from 'react';
import styeld from 'styled-components';
import styled from 'styled-components';
// #6E44FF
const CheckButtonWrapper = styled.div`
  color: ${props => (props.checked ? '#6E44FF' : '#a09fa7;')};

  background-color: #eaeaea;
  border-radius: 5px;
  padding: 10px 20px 10px 20px;
  text-align: center;
`;
const CheckButtonText = styled.p`
  font-size: 20px;
`;
export const CheckButton = ({ text, checked }) => {
  return (
    <CheckButtonWrapper checked={checked ? true : false}>
      <CheckButtonText>{text}</CheckButtonText>
    </CheckButtonWrapper>
  );
};
