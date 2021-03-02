import { ActionTypes } from '../types/ActionsTypes';
import { SHOW_LOADER, HIDE_LOADER } from '../types/constants';

export const showLoader = (): ActionTypes => {
  return {
    type: SHOW_LOADER,
  };
};

export const hideLoader = (): ActionTypes => {
  return {
    type: HIDE_LOADER,
  };
};

