import React from 'react';
import { ScreenWrapper } from 'Components/Atoms';
import styled from 'styled-components';
import term1 from 'assets/img/term1.png';
import term2 from 'assets/img/term2.png';
import term3 from 'assets/img/term3.png';
import term4 from 'assets/img/term4.png';
import term5 from 'assets/img/term5.png';

const TermImg = styled.img`
  width: 100%;
  max-width: 1000px;
`;
const Terms = () => {
  return (
    <ScreenWrapper>
      <TermImg src={term1} width="100%"></TermImg>
      <TermImg src={term2} width="100%"></TermImg>
      <TermImg src={term3} width="100%"></TermImg>
      <TermImg src={term4} width="100%"></TermImg>
      <TermImg src={term5} width="100%"></TermImg>
    </ScreenWrapper>
  );
};

export default Terms;
