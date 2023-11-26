// reducers.js
const initialState = {
  showChat: false,
  messages: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'OPEN_CHAT':
      return { ...state, showChat: true };
    case 'SET_MESSAGES':
      return { ...state, messages: action.payload };
    case 'ADD_MESSAGE':
      return { ...state, messages: [...state.messages, action.payload] };
    case 'DELETE_MESSAGES':
      return { ...state, messages: [] };
    default:
      return state;
  }
};

export default reducer;
