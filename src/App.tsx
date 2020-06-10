import React, { FC, useEffect, useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';
import { autoLogin } from './redux/actions/profileActions';
import { RootState } from './redux/reducers/rootReducer';
import { Thunk } from './redux/actions/ActionsTypes';
import Subscriptions from './Components/Containers/Subscriptions/Subscriptions';
import ThemeToggle from './Components/UI/ThemeToggler/ThemeToggle';
import Sidebar from './Components/Sidebar/Sidebar';
import Profile from './Components/Containers/Profile/Profile';
import Saved from './Components/Containers/Saved/Saved';
import Feed from './Components/Containers/Feed/Feed';
import './App.scss';

type Theme = 'light' | 'dark';

const getInitialTheme = () => {
  return localStorage.getItem('NEWSIUM/theme') as undefined | Theme;
};

const App: FC<AppProps> = ({ isAuthenticated, autoLogin }) => {
  const [theme, setTheme] = useState<Theme>('light');

  const onThemeChange = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light');
  };

  useEffect(() => {
    const theme = getInitialTheme();
    if (theme) setTheme(theme);
  }, []);

  useEffect(() => {
    localStorage.setItem('NEWSIUM/theme', theme);
  }, [theme]);

  useEffect(() => {
    autoLogin();
  }, [autoLogin]);

  const routes = [
    <Route path='/profile' component={Profile} key='profile' />,
    <Route path='/' exact component={Feed} key='feed' />,
  ];

  isAuthenticated &&
    routes.push(
      <Route path='/subscriptions' component={Subscriptions} key='subscriptions' />,
      <Route path='/saved' component={Saved} key='saved' />
    );

  return (
    <div className={`App ${theme}`}>
      <Sidebar isAuthenticated={isAuthenticated}>
        <ThemeToggle theme={theme} onChange={onThemeChange} />
      </Sidebar>
      <Switch>
        {routes}
        <Redirect to='/' />
      </Switch>
    </div>
  );
};

type MapState = { isAuthenticated: boolean };
const mapStateToProps = (state: RootState): MapState => ({ isAuthenticated: state.profile.isAuth });

type MapDispatch = { autoLogin: () => Thunk };
const mapDispatchToProps: MapDispatch = { autoLogin };

const connector = connect(mapStateToProps, mapDispatchToProps);
type AppProps = ConnectedProps<typeof connector>;

export default connector(App);
