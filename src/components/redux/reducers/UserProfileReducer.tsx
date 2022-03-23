import { ADD_USER, REMOVE_USER } from "../actionTypes/action-types";

import { UserState, UserTypes } from '../actions/user/add.d';

const INITIAL_STATE: UserState = {
  data: [],
  value: undefined
};

function userReducer(state = INITIAL_STATE, action: UserTypes): UserState {
  switch (action.type) {
    case ADD_USER: {
      return {
        ...state,
        data: [action.payload, ...state.data],
      };
    }
    case REMOVE_USER: {
      return {
        ...state,
        ...INITIAL_STATE,
      };
    }
    default:
      return state;
  }
}

export default userReducer;