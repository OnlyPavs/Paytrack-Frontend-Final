import axios from 'axios';
import {host} from "../config/keys"
import { GET_POSITIONS } from './types';
import { setSnackbarMessageSuccess, setSnackbarMessageError } from './snackbarServices';

const userId = localStorage.getItem('userId');

// Get all position
export const getPositions = () => (dispatch) => {
  const user = { userId };
  axios
    .post(host + '/positions/getAll', user)
    .then((res) => {
      dispatch(setPosition(res.data));
    })
    .catch((err) => {
      console.log('err', err);
    });
};

// Add new postion
export const addPosition = (position) => async (dispatch) => {
  position.userId = userId;
  return await axios
    .post(host + '/positions/add', position)
    .then((res) => {
      // Toggle on notification
      dispatch(setSnackbarMessageSuccess(res.data.msg));
      return Promise.resolve(res.data.positions);
    })
    .catch((err) => {
      // Toggle on notification
      dispatch(setSnackbarMessageError(err.response.data));
      return Promise.reject();
    });
};

// Update postion
export const updatePosition = (position) => async (dispatch) => {
  return await axios
    .post(host + '/positions/update', position)
    .then((res) => {
      // Toggle on notification
      dispatch(setSnackbarMessageSuccess(res.data.msg));
      return Promise.resolve(res.data.position);
    })
    .catch((err) => {
      // Toggle on notification
      dispatch(setSnackbarMessageError(err.response.data));
      return Promise.reject();
    });
};

// Set position
export const setPosition = (payload) => {
  return {
    type: GET_POSITIONS,
    payload: payload,
  };
};
