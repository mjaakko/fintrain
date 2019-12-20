const cacheWithSessionStorage = (key, cancellableFetchPromise) => {
  if (sessionStorage && sessionStorage.getItem(key) !== null) {
    return {
      result: Promise.resolve(JSON.parse(sessionStorage.getItem(key))),
      cancel: () => {},
    };
  } else {
    const promise = cancellableFetchPromise();
    return {
      result: promise.result.then(data => {
        if (sessionStorage) {
          try {
            sessionStorage.setItem(key, JSON.stringify(data));
          } catch (e) {
            //ignore errors
          }
        }
        return data;
      }),
      cancel: promise.cancel,
    };
  }
};

export default cacheWithSessionStorage;
