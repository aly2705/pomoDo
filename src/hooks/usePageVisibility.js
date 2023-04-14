import { useEffect } from 'react';
import { useRef } from 'react';

/**
 *
 * @param {Function} func : callback to be executed when page visibility changes
 */

const usePageVisibilty = func => {
  const callback = useRef(func);

  useEffect(() => {
    const visibilityChangeHandler = callback.current;
    window.addEventListener('visibilitychange', visibilityChangeHandler);

    return () => {
      window.removeEventListener('visibilitychange', visibilityChangeHandler);
    };
  }, [callback]);
};

export default usePageVisibilty;
