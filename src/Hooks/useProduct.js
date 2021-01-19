import { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';

export const useProduct = templink => {
  const userId = useSelector(state => state.user.id);

  const [data, setData] = useState({
    imageList: [],
    productTitle: '',
    productDetail: '',
    productPrice: '',
    kakaoUrl: '',
    description: '',
    d: 0,
    h: 1,
    m: 0,
    s: 0
  });
  const onChange = (name, value) => {
    setData(data => ({ ...data, [name]: value }));
  };
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      setLoading(false);
      const res = await fetch(
        `https://rest.dealink.co.kr/user/${userId}/auction/${templink}`
      );
      const data = await res.json();
      setData({
        imageList: [],
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

  return [data, onChange, loading, setLoading];
};
