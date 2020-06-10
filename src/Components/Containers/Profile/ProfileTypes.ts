import { ActionTypes } from './../../../redux/actions/ActionsTypes';
import { AuthFunction } from '../../Form/AuthTypes';
import { Country } from '../../../redux/reducers/ReducersTypes';

export type MapStateTypes = {
  isAuthentiphicated: boolean;
  country: Country;
  loading: boolean;
};

export type MapDispatchTypes = {
  auth: AuthFunction;
  setCountry: (country: Country) => void,
  logout: () => ActionTypes
};

export type Props = MapStateTypes & MapDispatchTypes;