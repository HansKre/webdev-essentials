export default async function fetchWithTimeout(url, options = {}) {
  const { timeout = 8000 } = options;
  const controller = new AbortController();

  // .abort() cancels the request
  let response;
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
    return response;
  }
}
