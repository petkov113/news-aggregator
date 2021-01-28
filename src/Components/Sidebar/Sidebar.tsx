import { FC } from 'react';
import { NavLink, withRouter, RouteComponentProps } from 'react-router-dom';
import './Sidebar.scss';

export type Link = {
  to: string;
  exact?: boolean;
  icon: string;
  tooltip: string;
  flow: 'right' | 'left' | 'top' | 'bottom';
};

type SidebarProps = RouteComponentProps & { isAuthenticated: boolean };

const Sidebar: FC<SidebarProps> = ({ isAuthenticated, children }) => {
  const links: Array<Link> = [
    { to: '/profile', tooltip: 'Profile', icon: 'fas fa-user-circle', flow: 'right' },
    { to: '/', exact: true, tooltip: 'Feed', icon: 'fas fa-stream', flow: 'right' },
  ];

  isAuthenticated &&
    links.push(
      { to: '/saved', tooltip: 'Saved', icon: 'fas fa-bookmark', flow: 'right' }
    )

  return (
    <nav className='Sidebar'>
      <ul className='Sidebar__wrapper'>
        {links.map((link) => (
          <li className='Sidebar__item' key={link.tooltip}>
            <NavLink {...link} data-testid={`${link.tooltip}-link`}>
              <i className={`${link.icon}`}></i>
            </NavLink>
          </li>
        ))}
      </ul>
      {children}
    </nav>
  );
};

export default withRouter(Sidebar);
