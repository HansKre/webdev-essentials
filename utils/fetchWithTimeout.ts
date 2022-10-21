interface FetchOptions {
  [rest: string]: any;
}

interface Params {
  url: string;
  timeout?: number;
  options?: FetchOptions;
}

/**
 * Wraps the standard fetch-method and cancels the request after a timeout.
 * Default timeout is set to 8000 milliseconds.
 *
 * @param {string} [required] url the fetch-url
 * @param {number} [optional] timeout the timeout in milliseconds
 * @param {FetchOptions} [optional = 8000] options the fetch options
 * @returns the `fetch`-Response or status: 529 with statusText: 'A Timeout Occurred'.
 */
export default async function fetchWithTimeout({
  url,
  timeout = 8000,
  options,
}: Params) {
  const controller = new AbortController();

  // .abort() cancels the request
  let response: { status: number; statusText: string } | Response = {
    status: 500,
    statusText: 'Internal Server Error',
  };
  const id = setTimeout(() => {
    controller.abort();
    response = {
      status: 529,
      statusText: 'A Timeout Occurred',
    };
  }, timeout);
  try {
    response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
  } catch (err) {
    // 'DOMException: The user aborted a request.'
  } finally {
    clearTimeout(id);
  }
  return response;
}
