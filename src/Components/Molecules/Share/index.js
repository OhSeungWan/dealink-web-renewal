import {
  FacebookShareButton,
  LineShareButton,
  TwitterShareButton
} from 'react-share';
import React, { useState } from 'react';

import { CopyToClipboard } from 'react-copy-to-clipboard';
import btnCopy from 'assets/img/btnCopy.png';
import btnFaceBook from 'assets/img/btnFaceBook.png';
import btnKakao from 'assets/img/btnKakao.png';
import btnLine from 'assets/img/btnLine.png';
import btnTwiter from 'assets/img/btnTwiter.png';
import { comma } from 'lib/Utils/comma-utils';
import styled from 'styled-components';

const ShareImageContainer = styled.div`
  flex: 1;
  padding: 10px;
`;

const ShareImage = styled.img`
  width: 100%;
`;
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
  background-color: #f5f5f7;
`;

const iOS = () => {
  return [
    'iPad Simulator',
    'iPhone Simulator',
    'iPod Simulator',
    'iPad',
    'iPhone',
    'iPod'
  ].includes(navigator.platform);
  // ||
  // // iPad on iOS 13 detection
  // (navigator.userAgent.includes('Mac') && 'ontouchend' in document)
};
const Share = ({ url, data }) => {
  const [copied, setCopied] = useState(false);
  const { Kakao } = window;

  const sendLink = () => {
    Kakao.Link.sendDefault({
      objectType: 'commerce',
      content: {
        title: `${data.description}`,
        imageUrl: data.imageUrls[0],
        link: {
          mobileWebUrl: url,
          webUrl: url
        }
      },
      commerce: {
        productName: `${data.name}\n(시작가:${comma(data.currentPrice)}원) `,
        regularPrice: parseInt(data.currentPrice)
      },
      buttons: [
        {
          title: '경매 참여하기',
          link: {
            mobileWebUrl: url,
            webUrl: url
          }
        }
      ]
    });
  };

  return (
    <Container>
      <Wrapper>
        {!iOS() && (
          <ShareImageContainer>
            <div id="kakao-link-btn" onClick={sendLink}>
              <ShareImage src={btnKakao} />
            </div>
          </ShareImageContainer>
        )}
        <ShareImageContainer>
          <FacebookShareButton url={url}>
            <ShareImage src={btnFaceBook} />
          </FacebookShareButton>
        </ShareImageContainer>
        <ShareImageContainer>
          <LineShareButton url={url}>
            <ShareImage src={btnLine} />
          </LineShareButton>
        </ShareImageContainer>
        <ShareImageContainer>
          <TwitterShareButton url={url}>
            <ShareImage src={btnTwiter} />
          </TwitterShareButton>
        </ShareImageContainer>
        <ShareImageContainer>
          <CopyToClipboard text={url} onCopy={() => setCopied(true)}>
            <ShareImage src={btnCopy} />
          </CopyToClipboard>
        </ShareImageContainer>
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
