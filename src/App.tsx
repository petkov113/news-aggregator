import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import './App.scss';
import Sidebar from './Components/Sidebar/Sidebar';
import Feed from './Components/Feed/Feed';
import Subscriptions from './Components/Subscriptions/Subscriptions';
import Saved from './Components/Saved/Saved';
import Profile from './Components/Profile/Profile';

const App: React.FC = () => {
  return (
    <div className='App'>
      <Sidebar />
      <Switch>
        <Route path='/profile' component={Profile} />
        <Route path='/' exact component={Feed} />
        <Route path='/subscriptions' component={Subscriptions} />
        <Route path='/saved' component={Saved} />
        <Redirect to='/' />
      </Switch>
    </div>
  );
};

export default App;
