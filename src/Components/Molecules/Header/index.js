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
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  text-align: left;
  background-color: white;
  width: 100%;
  height: 10%;
  max-height: 50px;
`;

const Header = () => {
  return (
    <HeaderContainer>
      <HeaderText> DeaLink</HeaderText>
    </HeaderContainer>
  );
};

export default Header;
