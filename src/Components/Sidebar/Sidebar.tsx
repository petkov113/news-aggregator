import React, { FC } from 'react';
import { NavLink, withRouter, RouteComponentProps } from 'react-router-dom';
import './Sidebar.scss';

type link = {
  to: string;
  exact: boolean;
  icon: string;
};

type SidebarProps = RouteComponentProps & {
  isAuthenticated: boolean;
};

const Sidebar: FC<SidebarProps> = ({ isAuthenticated }) => {
  const links: Array<link> = [
    { to: '/profile', exact: false, icon: 'fas fa-user-circle' },
    { to: '/', exact: true, icon: 'fas fa-stream' },
  ];

  isAuthenticated &&
    links.push(
      { to: '/subscriptions', exact: false, icon: 'fas fa-plus' },
      { to: '/saved', exact: false, icon: 'fas fa-clock' }
    );

  return (
    <nav className='Sidebar'>
      <ul className='Sidebar__wrapper'>
        {links.map((link, index) => (
          <li className='Sidebar__item' key={index}>
            <NavLink to={link.to} exact={link.exact}>
              <i className={`${link.icon}`}></i>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default withRouter(Sidebar);
