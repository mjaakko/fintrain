export default (findMaxVersion, createUniqueKey) => (state, action) => {
  switch (action.type) {
    case 'loading':
      return { loading: true, data: null, version: null, error: null };
    case 'update':
      const version =
        typeof findMaxVersion !== 'function'
          ? action.data.version
          : findMaxVersion(action.data);
      const data =
        typeof createUniqueKey !== 'function'
          ? action.data
          : Array.from(
              [...(state.data || []), ...action.data]
                .reduce((map, val) => {
                  map.set(createUniqueKey(val), val);
                  return map;
                }, new Map())
                .values()
            );

      return { loading: false, data, version, error: null };
    case 'error':
      return { loading: false, data: null, version: null, error: action.error };
    default:
      throw new Error('Invalid action type');
  }
};
