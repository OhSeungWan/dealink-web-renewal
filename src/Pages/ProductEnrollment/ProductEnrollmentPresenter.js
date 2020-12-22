import { Button, Container, ScreenWrapper } from 'Components/Atoms';
import { ImageBox, InfoList } from 'Components/Molecules';

import Header from 'Components/Molecules/Header';
import React from 'react';

const ProductEnrollmentPresenter = () => {
  return (
    <ScreenWrapper>
      <Container>
        <Header />
        <ImageBox type="upload" />
        <InfoList
          title="제목"
          content="로즈허브 빌드업 세럼+크림 set"
          horizon
          border
        />
        <InfoList
          title="제목"
          content="로즈허브 빌드업 세럼+크림 set"
          horizon
          border
        />
        <InfoList
          title="제목"
          content="로즈허브 빌드업 세럼+크림 set"
          horizon
          border
        />
        <InfoList title="제목" horizon border>
          <input></input>
        </InfoList>
        <InfoList title="제목" horizon border>
          <input></input>
        </InfoList>
        <InfoList title="제목" horizon border>
          <input></input>
        </InfoList>
        <Button primary common>
          상품등록
        </Button>
      </Container>
    </ScreenWrapper>
  );
};

export default ProductEnrollmentPresenter;
