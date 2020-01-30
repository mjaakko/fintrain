import { useState, useCallback } from 'react';

const usePersistedState = (key, storage, defaultValue) => {
  const [value, setValue] = useState(() => {
    if (!storage.getItem(key)) {
      storage.setItem(key, JSON.stringify(defaultValue));
    }

    return JSON.parse(storage.getItem(key));
  });
  const setAndPersistValue = useCallback(
    newValue => {
      storage.setItem(key, JSON.stringify(newValue));
      setValue(newValue);
    },
    [key, storage]
  );

  return [value, setAndPersistValue];
};

export default usePersistedState;
