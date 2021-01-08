import { useEffect, useState } from 'react';

export const useFetch = (payload, option) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [isrefetch, setIsRefetch] = useState(false);

  const refetch = flag => {
    if (!flag) return;

    setIsRefetch(state => !state);
  };

  const process = async payload => {
    console.log('⇣-------------useFetch Start-------------⇣');

    // if (type == 'url') {
    console.log(`✓ fetch Start ✓`);
    console.log(`✓ type: url >> ${payload}`);
    setIsLoading(false);
    setError(null);
    try {
      const data = await fetch(payload, option).then(res => res.json());
      setData(data);
      console.log(`✓ response⬇️`);
      console.log(data);
      data.status == 500 ? setIsLoading(false) : setIsLoading(true);
    } catch (error) {
      console.log(`⚠︎ Error ⚠︎ : ${error}`);
      setError(error);
      setIsLoading(false);
    }
    // } else if (type == 'api') {
    //   console.log(`✓ fetch Start ✓`);
    //   console.log(`✓ type: api `);
    //   try {
    //     const data = await payload;
    //     setData(data);
    //     console.log(`✓ response⬇️`);
    //     console.log(data);
    //   } catch (error) {
    //     console.log(`⚠︎ Error ⚠︎ : ${error}`);

    //     setError(error);
    //     setIsLoading(false);
    //   }
    // }
    console.log('⇡_____________useFetch End_____________⇡');
  };

  useEffect(() => {
    if (payload) {
      process(payload);
    }
  }, [isrefetch]);

  return [data, isLoading, error, refetch];
};
