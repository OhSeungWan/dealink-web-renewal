import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

import React, { useEffect, useState } from 'react';

import banerTop from 'assets/img/banerTop.png';
import banerTop2 from 'assets/img/banerTop2.png';
import { confirmAlert } from 'react-confirm-alert'; // Import
import { useHistory } from 'react-router-dom';

// TODO: 페이지별 나타나는 조건 설정해 줘야함
const iOS = () => {
  return [
    'iPad Simulator',
    'iPhone Simulator',
    'iPod Simulator',
    'iPad',
    'iPhone',
    'iPod'
    // 'MacIntel'
  ].includes(navigator.platform);
  // ||
  // // iPad on iOS 13 detection
  // (navigator.userAgent.includes('Mac') && 'ontouchend' in document)
};

export const BannerTop = () => {
  const history = useHistory();

  var userAgent = navigator.userAgent.toLowerCase();
  console.log(userAgent);

  var browser = true;

  if (userAgent.includes(`APP_DEALINK`)) {
    browser = false;
  } else {
    browser = true;
  }

  const onClick = () => {
    const isIos = iOS();
    if (isIos && !userAgent.includes(`APP_DEALINK`)) {
      window.location.href =
        'https://apps.apple.com/kr/app/apple-store/id1552343126';

      // confirmAlert({
      //   customUI: ({ onClose }) => {
      //     return (
      //       <div>
      //         <h1>IOS 사용자이신가요 ? </h1>
      //         <p>죄송합니다. ios App 버전 준비중입니다.</p>
      //         <p>웹으로 이용해 주시면 감사하겠습니다.</p>

      //         <div
      //           style={{
      //             display: 'flex',
      //             justifyContent: 'space-evenly',
      //             width: '100%'
      //           }}
      //         >
      //           <button
      //             style={{
      //               border: 'none',
      //               width: '90%',
      //               margin: 5,
      //               padding: 5
      //             }}
      //             onClick={onClose}
      //           >
      //             취소
      //           </button>
      //         </div>
      //       </div>
      //     );
      //   }
      // });
    } else if (!isIos && !userAgent.includes(`APP_DEALINK`)) {
      window.location.href =
        'https://play.google.com/store/apps/details?id=com.dealink';
    }
  };

  const goMain = () => {
    history.push('/main');
  };

  useEffect(() => {}, []);

  return browser ? (
    <div>
      <img
        alt="no src"
        src={banerTop}
        width="100%"
        height="100%"
        style={{ maxWidth: '400px', maxHeight: 80 }}
        onClick={onClick}
      />
    </div>
  ) : (
    <div>
      <img
        alt="no src"
        src={banerTop2}
        width="100%"
        height="100%"
        style={{ maxWidth: '400px', maxHeight: 80 }}
        onClick={goMain}
      />
    </div>
  );
};
