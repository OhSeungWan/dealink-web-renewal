import styled, { css } from 'styled-components';

import React from 'react';
import { Text } from 'Components/Atoms';

const InfoListWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  ${props => {
    return css`
      flex-direction: ${props.horizon ? 'row' : 'column'};
      border-bottom: ${props.border ? 'solid 1px black' : 'none'};
    `;
  }}
`;
const InfoWrapper = styled.div`
  text-align: ${props => (props.title ? 'left' : 'center')};
  flex: 1;
`;
const InfoListText = styled(Text);

const InfoList = ({ title, content, horizon, border, children }) => {
  return (
    <InfoListWrapper horizon={horizon ? true : false} border={border}>
      <InfoWrapper title>{title}</InfoWrapper>
      {content && <InfoWrapper>{content}</InfoWrapper>}
      {children && <InfoWrapper>{children}</InfoWrapper>}
    </InfoListWrapper>
  );
};

export default InfoList;
