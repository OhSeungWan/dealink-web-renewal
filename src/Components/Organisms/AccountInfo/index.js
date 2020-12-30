import { CheckButton, Input, Text } from 'Components/Atoms';
import { ImageBox, List, Timer } from 'Components/Molecules';

import React from 'react';
import styled from 'styled-components';

const AccountInfo = () => {
  return (
    <List>
      <Text>입금계좌</Text>
      <Input placeholder="은행을 서택해주세요." />
      <Input placeholder="계좌번호를입력해주세요." />
      <Input placeholder="예금주를 입력해주세요" />
      <Input placeholder="연락처를 입력해주세요" />
    </List>
  );
};

export default AccountInfo;
