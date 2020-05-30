import { ActionTypes } from './ActionTypes';
import {
  SHOW_LOADER,
  HIDE_LOADER,
} from '../constants';

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

