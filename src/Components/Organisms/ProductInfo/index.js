import { Border, Input, Text } from 'Components/Atoms';
import { ImageBox, List } from 'Components/Molecules';

import React from 'react';
import styled from 'styled-components';

const TextArea = styled.textarea.attrs(props => ({ rows: 5, cols: 33 }))`
  padding: 20px;
  border: 1px solid #eaeaea;
  border-radius: 5px;
  margin: 15px 0px 15px 0px;
`;

const ProductInfo = props => {
  const onChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    props.onChange(name, value);
  };

  return (
    <List>
      <Text>상품사진</Text>
      <ImageBox type="upload" onChange={props.onChange} />
      <Text>상품명</Text>
      <Input
        name="productTitle"
        placeholder={'상품명을 입력해주세요'}
        onChange={onChange}
      />
      <Text>상품설명</Text>
      <TextArea
        name="productDetail"
        placeholder={'상품설명을 입력해주세요'}
        onChange={onChange}
      />
      <Text>상품가격</Text>
      <Input
        name="productPrice"
        placeholder={'시작가를 입력해주세요.'}
        onChange={onChange}
      />
      <Text>카카오 오픈채팅 URL</Text>
      <Input
        name="kakaoUrl"
        placeholder={'추후 낙찰자와 대화하기 위한 채팅방 입니다.'}
        onChange={onChange}
      />
      <Border height="8px" />
    </List>
  );
};

export default ProductInfo;
