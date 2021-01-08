import { Input, Text } from 'Components/Atoms';

import { List } from 'Components/Molecules';
import React from 'react';

const AccountInfo = () => {
  return (
    <List alignCenter>
      <Text>입금계좌</Text>
      <Input placeholder="은행을 서택해주세요." />
      <Input placeholder="계좌번호를입력해주세요." />
      <Input placeholder="예금주를 입력해주세요" />
      <Input placeholder="연락처를 입력해주세요" />
    </List>
  );
};
export default AccountInfo;
