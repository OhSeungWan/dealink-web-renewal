import React from 'react';
import banerTop from 'assets/img/banerTop.png';
import { useHistory } from 'react-router-dom';

// TODO: 페이지별 나타나는 조건 설정해 줘야함

export const BannerTop = () => {
  const history = useHistory();
  const onClick = () => {
    console.log('asdf');
    history.push('/main');
  };
  return (
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
  );
};
