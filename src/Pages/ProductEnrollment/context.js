import React from 'react';
export const ProductEnrollmentInput = {
  imageList: [],
  productTitle: '',
  productDetail: '',
  productPrice: '',
  kakaoUrl: '',
  d: '',
  h: '',
  m: '',
  s: ''
};

export const ProductEnrollmentContext = React.createContext(
  ProductEnrollmentInput
);
