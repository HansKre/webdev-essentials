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

  useEffect(async () => {
    if (url) {
      setError(undefined);
      setIsLoading(true);
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
  }, [url]);

  return { isLoading, error, data };
}
