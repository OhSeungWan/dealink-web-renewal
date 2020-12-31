import React, { useState } from 'react';

import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FaLink } from 'react-icons/fa';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Text = styled.div`
  font-size: 25px;
  font-weight: 700;
  padding: 0px 30px 0px 30px;
`;

const Share = ({ url }) => {
  const [value, setValue] = useState(url);
  const [copied, setCopied] = useState(false);

  return (
    <Container>
      <Wrapper>
        <Text>공유</Text>
        <CopyToClipboard text={value} onCopy={() => setCopied(true)}>
          <FaLink size={30} color="#6E44FF" style={{ paddingRight: 30 }} />
        </CopyToClipboard>
      </Wrapper>
      {copied ? (
        <div style={{ color: '#6E44FF', padding: 20, fontSize: 20 }}>
          링크 URL이 클립보드로 복사되었습니다.
        </div>
      ) : null}
    </Container>
  );
};

export default Share;
