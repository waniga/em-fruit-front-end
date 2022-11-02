import { NavLink } from 'react-router-dom';
import AppLogo from '../../assets/images/logo.svg';
import { useRef } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { GuestModeMenu } from './GuestModeMenu';
import { UserModeMenu } from './UserModeMenu';
import { AdminModeMenu } from './AdminModeMenu';

function Header() {
  const { user } = useAuth();
  const collapseRef = useRef(null);

  return (
    <nav className="navbar navbar-expand-lg bg-nav fixed-top">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to={'/'}>
          <img
            className="app-logo"
            src={AppLogo}
            alt="logo"
            data-bs-toggle="collapse"
            data-bs-target=".navbar-collapse.show"
          />
        </NavLink>
        <div className="d-flex">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
        <div
          className="collapse navbar-collapse"
          ref={collapseRef}
          id="navbarNavDropdown"
        >
          {user?.is_admin === false ? <UserModeMenu /> : null}
          {user?.is_admin === true ? <AdminModeMenu /> : null}
          {user === null ? <GuestModeMenu /> : null}
        </div>
      </div>
    </nav>
  );
}

export default Header;
