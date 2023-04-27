// frontend/src/store/session.js
import { csrfFetch } from './csrf';
import axios from "axios";

const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';

const setUser = (user) => {
    return {
        type: SET_USER,
        payload: user,
    };
};

const removeUser = () => {
    return {
        type: REMOVE_USER,
    };
};



export const restoreUser = () => async (dispatch) => {
  const { data } = await csrfFetch("/api/session");
  dispatch(setUser(data?.user));
};

export const login = (user) => async (dispatch) => {
  const { credential, password } = user;
  const { data } = await csrfFetch("/api/session", {
    method: "POST",
    data: JSON.stringify({
      credential,
      password,
    }),
  });
  dispatch(setUser(data?.user));
};

export const signup = (user) => async (dispatch) => {
  const { username, firstName, lastName, email, password } = user;
  const {data} = await csrfFetch("/api/users", {
    method: "POST",
    data: JSON.stringify({
      username,
      firstName,
      lastName,
      email,
      password,
    }),
  });
  dispatch(setUser(data?.user));
};

export const logout = () => async (dispatch) => {
  const response = await csrfFetch("/api/session", {
    method: "DELETE",
  });
  dispatch(removeUser());
  return response;
};


const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case SET_USER:
            newState = Object.assign({}, state);
            newState.user = action.payload;
            return newState;
        case REMOVE_USER:
            newState = Object.assign({}, state);
            newState.user = null;
            return newState;
        default:
            return state;
    }
};

export default sessionReducer;
