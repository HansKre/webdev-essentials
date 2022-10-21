import { useState, useEffect } from 'react';
import fetchWithTimeout from '../utils/fetchWithTimeout';

interface Props {
  url: string;
  timeout?: number;
}

export default function useAPIFetch({ url, timeout }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<{ code: number; text: string }>();
  const [data, setData] = useState();

  useEffect(() => {
    async function fetchData() {
      const response = await fetchWithTimeout(url, { timeout });
      if (response && response.status === 200) {
        const json = await (response as Response).json();
        setData(json);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        setError({ code: response.status, text: response.statusText });
      }
    }

    if (url) {
      setError(undefined);
      setIsLoading(true);
      fetchData().catch((e) => {
        console.log(e);
        setIsLoading(false);
        setError({ code: 500, text: 'Internal Server Error' });
      });
    }
  }, [url]);

  return { isLoading, error, data };
}
