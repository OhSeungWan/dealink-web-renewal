import { useEffect, useRef } from 'react';

export const useInterval = (callback, delay) => {
  const savedCallback = useRef();

  // 가장 최근의 콜백함수를 기억
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // 인터벌 효과 재적용
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => {
        clearInterval(id);
      };
    }
  }, [delay]);
};
