import { useState, useEffect } from 'react';
import { APIResponse } from '../types';
import fetchWithTimeout from '../utils/fetchWithTimeout';

const BASE_URL = '/api/mock';

interface Props {
  guid: string;
}

export default function useAPIFetch({ guid }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<{ code: number; text: string }>();
  const [data, setData] = useState<APIResponse>();

  useEffect(() => {
    async function doFetch() {
      const response = await fetchWithTimeout(`/api/mock/${guid}`);
    }

    if (guid) {
      setError(undefined);
      setIsLoading(true);
      fetch(`/api/mock/${guid}`).then((response) => {
        if (response.status === 200) {
          response.json().then((apiResponse: APIResponse) => {
            if (apiResponse.guid !== guid) {
              console.log(
                `GUID=${apiResponse.guid} from API-Response did not match requested GUID=${guid}.`
              );
              setIsLoading(false);
              setError({
                code: 500,
                text: 'Server responded with invalid document.',
              });
            }
            setData(apiResponse);
          });
          setIsLoading(false);
        } else {
          setIsLoading(false);
          setError({ code: response.status, text: response.statusText });
        }
      });
    } else {
      // not needed. guid is always retrieved from query a little bit delayed
    }
  }, [guid]);

  return { isLoading, error, data };
}
