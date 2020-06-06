import { FormikValues } from "formik";

export type AuthFunction = (
  values: FormikValues,
  setStatus: (status: any) => void,
  isLogin: boolean
) => void;

export type FieldType = 'email' | 'password' | 'text' | 'checkbox';

export type AuthProps = {
  handleRegister: AuthFunction;
  handleLogin: AuthFunction
  isLoading: boolean
};
