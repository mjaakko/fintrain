import { useState, useEffect } from 'react';

const useMediaQuery = (query, defaultMatches) => {
  const [match, setMatch] = useState(!!defaultMatches);

  useEffect(() => {
    const mql = window.matchMedia(query);

    setMatch(mql.matches);

    const listener = event => setMatch(event.matches);
    mql.addListener(listener);

    return () => mql.removeListener(listener);
  }, [query]);

  return match;
};

export default useMediaQuery;
