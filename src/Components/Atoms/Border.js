import React from 'react';
import styled from 'styled-components';

export const Border = styled.div`
  width: 100%;
  height: ${props => (props.height ? props.height : '1px')};
  background-color: #f5f5f7;
  margin: 20px 0px 20px 0px;
`;
