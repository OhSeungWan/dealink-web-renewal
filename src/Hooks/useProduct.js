import { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';

export const useProduct = templink => {
  //TODO: 고쳐야함
  // const userId = useSelector(state => state.user.id);
  const userId = sessionStorage.getItem('userId');

  const [data, setData] = useState({
    imageList: [],
    productTitle: '',
    productPrice: '',
    kakaoUrl: 'https://open.kakao.com/o/gDbtKmTc',
    description: '',
    d: 0,
    h: 0,
    m: 0,
    s: 0
  });

  const onChange = (name, value) => {
    if (name == 'imageList') {
      console.log('img');
      setData(data => {
        return { ...data, [name]: data.imageList.concat(value) };
      });
    } else if (name == 'removeImg') {
      setData(data => {
        return {
          ...data,
          imageList: data.imageList.filter(img => img.name != value)
        };
      });
    } else {
      setData(data => ({ ...data, [name]: value }));
    }
  };
  const [loading, setLoading] = useState(false);

  const validateMessage = {
    imageList: '이미지를 등록해주세요.',
    productTitle: '상품명을 등록해주세요',
    productPrice: '상품가격을 설정해주세요',
    description: '상품설명을 작성해주세요.',
    time: '경매 마감시간을 설정해주세요.'
  };
  const validate = () => {
    for (const [key, value] of Object.entries(data)) {
      if (key === 'd' || key === 'h' || key === 'm' || key === 's') {
        if (data.d == 0 && data.h == 0 && data.m == 0 && data.s == 0) {
          alert(validateMessage.time);
          document.getElementById('timer').focus();
          document
            .getElementById('timer')
            .scrollIntoView({
              behavior: 'smooth',
              block: 'center',
              inline: 'nearest'
            });
          return true;
        }
      } else if (value == '' || value == null || !value) {
        alert(validateMessage[key]);
        document.getElementById(key).focus();
        document
          .getElementById(key)
          .scrollIntoView({
            behavior: 'smooth',
            block: 'center',
            inline: 'nearest'
          });
        return true;
      }
    }
    return false;
  };

  useEffect(() => {
    const getData = async () => {
      setLoading(false);
      const res = await fetch(
        `https://rest.dealink.co.kr/user/${userId}/auction/${templink}`
      );
      const data = await res.json();
      console.log(data);
      setData({
        imageList: data.imageUrls,
        productTitle: data.name,
        productDetail: data.description,
        productPrice: data.startingPrice,
        kakaoUrl: data.chatUrl,
        description: data.description,
        d: data.days,
        h: data.hours,
        m: data.minutes,
        s: data.seconds
      });

      setLoading(true);
    };
    if (templink) {
      getData();
    }
    setLoading(true);
    console.log('use');
    console.log(data);
  }, []);

  return [data, onChange, loading, setLoading, validate];
};
