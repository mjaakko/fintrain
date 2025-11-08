const cancellableFetch = (url, options) => {
  if ('AbortController' in window) {
    const controller = new AbortController();
    const signal = controller.signal;
    return {
      result: fetch(url, { ...options, signal }),
      cancel: () => controller.abort(),
    };
  } else {
    return { result: fetch(url, options), cancel: () => {} };
  }
};

export default cancellableFetch;
