const initialState = {
  news: [],
};

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOAD_NEWS":
      return {
        ...state,
      };
    default:
      return state;
  }
};
