import React, { useState } from 'react';

export const useInput = initialValue => {
  const [values, setValue] = useState(initialValue);
  const onChage = (key, value) => {
    setValue({ ...values, [key]: value });
  };
  return [values, onChage];
};
