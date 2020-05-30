import { ThunkAction } from 'redux-thunk';
import { RootState } from './../reducers/rootReducer';
import { FormikValues, FormikErrors } from 'formik';
import axios from 'axios';
import { ActionTypes } from './ActionTypes';

export const onRegister = (
  values: FormikValues,
  setErrors: (errors: FormikErrors<FormikValues>) => void,
  setSubmitting: (isSubmitting: boolean) => void
): ThunkAction<Promise<void>, RootState, unknown, ActionTypes> => async (dispatch) => {
  console.log('hello');
  try {
    const response = await axios.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=${process.env.FIREBASE_API_KEY}`
    );
  } catch (e) {
    console.log(e);
  }
};
