import React, { FC, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';
import { autoLogin } from './redux/actions/profileActions';
import { RootState } from './redux/reducers/rootReducer';
import Subscriptions from './Components/Containers/Subscriptions/Subscriptions';
import Sidebar from './Components/Sidebar/Sidebar';
import Profile from './Components/Containers/Profile/Profile';
import Saved from './Components/Containers/Saved/Saved';
import Feed from './Components/Containers/Feed/Feed';
import './App.scss';
import { ThunkAction } from 'redux-thunk';
import { ActionTypes } from './redux/actions/ActionsTypes';

const App: FC<AppProps> = ({ isAuthenticated, autoLogin }) => {
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
    <div className='App'>
      <Sidebar isAuthenticated={isAuthenticated} />
      <Switch>
        {routes}
        <Redirect to='/' />
      </Switch>
    </div>
  );
};

type MapState = { isAuthenticated: boolean };
const mapStateToProps = (state: RootState): MapState => ({ isAuthenticated: state.profile.isAuth });

type MapDispatch = { autoLogin: () =>  ThunkAction<void, RootState, unknown, ActionTypes> };
const mapDispatchToProps: MapDispatch = { autoLogin };

const connector = connect(mapStateToProps, mapDispatchToProps);
type AppProps = ConnectedProps<typeof connector>;

export default connector(App);
