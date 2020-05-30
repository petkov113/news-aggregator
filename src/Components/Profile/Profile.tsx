import React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../redux/reducers/rootReducer';
import AuthForm from '../Form/AuthForm';
import './Profile.scss';

export const Profile = () => {
  return (
    <div className='Profile'>
      <div className='Profile__intro'>
        <h1 className='Profile__title'>Newsium</h1>
        <h2 className='Profile__subtitle'>News from all over the world in one place</h2>
      </div>
      <div className='Profile__form'>
        <h2 className='Profile__subtitle'>Log in to get the full access</h2>
        <AuthForm />
        <div className='Profile__info'>
          <span>Creating an account will give you ability to:</span>
          <ul>
            <li>Save articles to read them later</li>
            <li>Select country</li>
            <li>Subscribe to a particular sources</li>
          </ul>
        </div>
      </div>
      {/* <div className='Profile__settings'></div> */}
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  isAuth: state.app.isAuth,
  country: state.app.country,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

// "https://newsapi.org/v2/sources?apiKey=${}"
