import { useEffect, useState } from 'react';

export const useTest = data => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isrefetch, setIsRefetch] = useState(false);

  const refetch = flag => {
    if (!falg) return;

    setIsRefetch(state => !state);
  };

  const test = async data => {
    setIsLoading(false);
    setError(null);

    try {
      const Data = data;
      setData(Data);
    } catch (err) {
      setError(err);
    }
  };

  useEffect(() => {
    process();
  }, [data, isrefetch]);

  return [data, isLoading, error, refetch];
};
