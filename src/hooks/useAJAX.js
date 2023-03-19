import { useState, useCallback } from 'react';

const useAJAX = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async (reqConfig, processData) => {
    try {
      setError(null);
      setIsLoading(true);
      const reqOptions =
        reqConfig.method !== 'GET'
          ? {
              method: reqConfig.method,
              headers: reqConfig.headers,
              body: reqConfig.body || null,
            }
          : {
              headers: reqConfig.headers || undefined,
            };
      const res = await fetch(reqConfig.url, reqOptions);

      if (res.status === 204) {
        processData();
        setIsLoading(false);
        return;
      }
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }
      processData(data);
    } catch (err) {
      setError(err);
    }
    setIsLoading(false);
  }, []);

  return { isLoading, error, sendRequest, setIsLoading, setError };
};

export default useAJAX;
