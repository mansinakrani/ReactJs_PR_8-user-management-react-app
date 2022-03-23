import { ADD_USER, REMOVE_USER } from '../actionTypes/action-types';

export const addUser = (data:any) => ({
  payload: data,
  type: ADD_USER,
});

export const removeUser = (data:any) => ({
  payload: data,
  type: REMOVE_USER,
});