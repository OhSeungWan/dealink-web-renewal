import { Container, Text } from 'Components/Atoms';

import React from 'react';
import styled from 'styled-components';

const HeaderText = styled(Text)`
  font-weight: 700;
  font-size: 25px;
  text-align: left;
  padding: 5px;
`;

const HeaderContainer = styled.div`
  width: 100%;
  text-align: left;
`;

const Header = () => {
  return (
    <HeaderContainer>
      <HeaderText> DeaLink</HeaderText>
    </HeaderContainer>
  );
};

export default Header;
