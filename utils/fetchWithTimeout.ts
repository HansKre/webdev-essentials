interface Options {
  timeout?: number;
  [rest: string]: any;
}

export default async function fetchWithTimeout(url: string, options?: Options) {
  const timeout = options ? options.timeout : 8000;
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
