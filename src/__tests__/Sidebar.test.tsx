import { createMemoryHistory, Location, History } from 'history';
import { Router, MemoryRouter, Route, Switch } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import Sidebar from '../Components/Sidebar/Sidebar';

const createTestComponent = (location: Location<History.PoorMansUnknown>) => (
  <div data-testid='location-display'>{location.pathname}</div>
);

const ChildComponent = () => <div>ChildComponent</div>;

const testRoutes = [
  { path: '/profile', key: 'profile' },
  { path: '/', key: 'feed', exact: true },
  { path: '/saved', key: 'saved' },
].map((route) => (
  <Route
    {...route}
    exact={route.exact ? true : false}
    render={({ location }) => createTestComponent(location)}
  />
));

const authenticatedLinks = ['profile', 'feed'];
const allLinks = authenticatedLinks.concat('saved');

const Component = (
  isAuthenticated: boolean,
  children?: () => React.ReactNode,
  routes?: boolean
) => {
  return (
    <MemoryRouter>
      <Sidebar isAuthenticated={isAuthenticated}>{children && children()}</Sidebar>
      {routes && <Switch>{testRoutes}</Switch>}
    </MemoryRouter>
  );
};

describe('SIDEBAR', () => {
  it('should render profile and feed links if the user is not authenticated', () => {
    render(Component(false));
    for (let i = 0; i < authenticatedLinks.length; i++) {
      expect(
        screen.getByTestId(new RegExp(`${authenticatedLinks[i]}-link`, 'i'))
      ).toBeInTheDocument();
    }
  });

  it('should render profile, feed and saved links if the user is authenticated', () => {
    render(Component(true));

    for (let i = 0; i < allLinks.length; i++) {
      expect(screen.getByTestId(new RegExp(`${allLinks[i]}-link`, 'i'))).toBeInTheDocument();
    }
  });

  it('should direct to a proper route', () => {
    const history = createMemoryHistory();
    const route = '/profile';
    history.push(route);
    render(
      <Router history={history}>
        <Sidebar isAuthenticated={true} />
        <Switch>{testRoutes}</Switch>
      </Router>
    );
    expect(screen.getByTestId('location-display')).toHaveTextContent(route);
  });

  it('should render children', () => {
    render(Component(true, ChildComponent));
    expect(screen.getByText('ChildComponent')).toBeInTheDocument();
  });
});
