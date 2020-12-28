import { ImageBox, List } from 'Components/Molecules';
import { Input, Text } from 'Components/Atoms';

import React from 'react';
import styled from 'styled-components';

const ProductInfo = () => {
  return (
    <List>
      <Text>상품사진</Text>
      <ImageBox type="upload" />
      <Text>상품명</Text>
      <Input placeholder={'상품명을 입력해주세요'} />
      <Text>상품설명</Text>
      <Input placeholder={'상품설명을 입력해주세요'} />
      <Text>상품가격</Text>
      <Input placeholder={'시작가를 입력해주세요.'} />
    </List>
  );
};

export default ProductInfo;
