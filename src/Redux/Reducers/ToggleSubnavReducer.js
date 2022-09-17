import { TOGGLE_SUBNAV } from "../Actiontype";

const INITIAL_STATE = {
  isOpen: false,
};

export default function toggleSubnavReducer (state = INITIAL_STATE, action)  {
  switch (action.type) {
    case TOGGLE_SUBNAV:
      return {
        ...state,
        isOpen: !state.isOpen,
      };

    default:
      return state;;
  }
};
