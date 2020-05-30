import React from 'react';
import './Sidebar.scss';
import { NavLink, withRouter } from 'react-router-dom';

type link = {
  to: string;
  exact: boolean;
  icon: string;
};

const links: link[] = [
  { to: '/profile', exact: false, icon: 'fas fa-user-circle' },
  { to: '/', exact: true, icon: 'fas fa-stream' },
  { to: '/subscriptions', exact: false, icon: 'fas fa-plus' },
  { to: '/saved', exact: false, icon: 'fas fa-clock' },
];

const Sidebar: React.FC = () => {
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
