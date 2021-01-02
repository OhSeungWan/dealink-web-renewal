import { useEffect, useState } from 'react';

export const useFetch = (url, option) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [isrefetch, setIsRefetch] = useState(false);

  const refetch = flag => {
    if (!flag) return;

    setIsRefetch(state => !state);
  };

  const process = async url => {
    console.log(url);
    setIsLoading(false);
    setError(null);

    try {
      const data = await fetch(url, option).then(res => res.json());
      setData(data);
      console.log('``````````data``````````');
      console.log(data);
      data.status == 500 ? setIsLoading(false) : setIsLoading(true);
    } catch (error) {
      //   console.log('````````fetch faild````````');
      //   console.log(```````Error : ${error}```````);
      setError(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log(url);
    if (url) {
      process(url);
    }
  }, [url, isrefetch]);

  return [data, isLoading, error, refetch];
};
