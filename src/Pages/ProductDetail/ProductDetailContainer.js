import React, { useEffect, useState } from 'react';

import ProductDetailPresenter from 'Pages/ProductDetail/ProductDetailPresenter';

const ProductDetailContainer = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getAuction = async () => {
      const res = await fetch(
        'http://192.168.0.102:8080//user/1/auction/7ad7e0bc-3595-4f77-9a2e-05edb4d28dbf-20201230150622'
      );

      const data = await res.json();
      console.log(data);
      setData(data);
      setLoading(true);
    };

    getAuction();
  }, []);

  return loading && <ProductDetailPresenter {...data} />;
};

export default ProductDetailContainer;
