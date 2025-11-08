const loaderReducer = (state, action) => {
  switch (action.type) {
    case 'loading':
      return { loading: true, data: null, error: null };
    case 'data':
      return { loading: false, data: action.data, error: null };
    case 'error':
      return { loading: false, data: null, error: action.error };
    default:
      throw new Error('Invalid action type');
  }
};

export default loaderReducer;
