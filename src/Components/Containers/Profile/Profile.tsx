import React, { FC, ChangeEvent } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { MapStateTypes, MapDispatchTypes } from './ProfileTypes';
import { auth, setCountry, setTheme, logout } from '../../../redux/actions/profileActions';
import { Country, Theme } from '../../../redux/reducers/ReducersTypes';
import { RootState } from '../../../redux/reducers/rootReducer';
import AuthForm from '../../Form/AuthForm';
import Select from '../../UI/Select/Select';
import Button from '../../UI/Button/Button';
import './Profile.scss';

const countries: Country[] = [
  { name: 'USA', code: 'us' },
  { name: 'Russia', code: 'ru' },
  { name: 'Bulgaria', code: 'bg' },
  { name: 'Romania', code: 'ro' },
  { name: 'Austria', code: 'au' },
  { name: 'Great Britain', code: 'gb' },
  { name: 'Italy', code: 'it' },
];

export const Profile: FC<ProfileProps> = ({
  isAuthentiphicated,
  country,
  auth,
  loading,
  logout,
  setCountry,
  theme,
}) => {
  const onCoutryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const item = countries.find((country) => country.name === e.target.value) as Country;
    setCountry(item);
  };

  const onThemeChange = (event: ChangeEvent<HTMLSelectElement> & { target: { value: Theme } }) => {
    setTheme(event.target.value);
  };

  return (
    <div className='Profile'>
      {isAuthentiphicated ? (
        <div className='Profile__settings'>
          <h1 className='Profile__title'> Settings </h1>
          <div className='Profile__inputs'>
            <Select
              title='Select your country'
              defValue={country.name}
              name='countries'
              items={countries.reduce((acc: string[], country) => {
                return [...acc, country.name];
              }, [])}
              onChange={onCoutryChange}
            />
            <Select
              title='Theme'
              defValue={theme}
              name='theme'
              items={['light', 'dark']}
              onChange={onThemeChange}
            />
            <Button btnType='primary' onClick={logout} value='Logout' />
          </div>
        </div>
      ) : (
        <>
          <div className='Profile__intro'>
            <h1 className='Profile__title'>Newsium</h1>
            <h2 className='Profile__subtitle'>News from all over the world in one place</h2>
          </div>
          <div className='Profile__form'>
            <h2 className='Profile__subtitle'>Log in to get the full access</h2>
            <AuthForm handleRegister={auth} isLoading={loading} handleLogin={auth} />
            <div className='Profile__info'>
              <span>Creating an account will give you ability to:</span>
              <ul>
                <li>Save articles to read them later</li>
                <li>Select country</li>
                <li>Subscribe to a particular sources</li>
              </ul>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const mapStateToProps = (state: RootState): MapStateTypes => ({
  isAuthentiphicated: state.profile.isAuth,
  country: state.profile.country,
  loading: state.profile.loading,
  theme: state.profile.theme,
});

const mapDispatchToProps: MapDispatchTypes = { auth, setCountry, logout };

const connector = connect(mapStateToProps, mapDispatchToProps);
type ProfileProps = ConnectedProps<typeof connector>;

export default connector(Profile);

// "https://newsapi.org/v2/sources?apiKey=${}"
