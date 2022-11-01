import { NavLink } from 'react-router-dom';
import { useProduct } from '../../contexts/ProductContext';
import AppLogo from '../../assets/images/logo.svg';
import { useRef, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

function Header() {
  const { user, logout } = useAuth();
  const { count } = useProduct();
  const collapseRef = useRef(null);

  const hideBars = () => {
    console.log('hideBars');
    collapseRef.current.setAttribute('class', 'navbar-collapse collapse');
  };
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
          <ul className="navbar-nav nav-menu d-flex justify-content-center align-items-center">
            <NavLink className="nav-link" to={'/'}>
              <li
                className="nav-item"
                data-bs-toggle="collapse"
                data-bs-target=".navbar-collapse.show"
              >
                หน้าแรก
              </li>
            </NavLink>

            <NavLink className="nav-link" to={'/product'}>
              <li
                className="nav-item"
                data-bs-toggle="collapse"
                data-bs-target=".navbar-collapse.show"
              >
                ผลไม้สด
              </li>
            </NavLink>
            <li
              className="nav-item"
              data-bs-toggle="collapse"
              data-bs-target=".navbar-collapse.show"
            >
              <NavLink className="nav-link" to={'/about'}>
                เกี่ยวกับเรา
              </NavLink>
            </li>
            {user ? (
              <>
                <NavLink className="nav-link" to={'/order'}>
                  <li
                    className="nav-item"
                    data-bs-toggle="collapse"
                    data-bs-target=".navbar-collapse.show"
                  >
                    ประวัติการสั่งซื้อ
                  </li>
                </NavLink>
              </>
            ) : (
              <>
                <NavLink className="nav-link" to={'/login'}>
                  <li
                    className="nav-item"
                    data-bs-toggle="collapse"
                    data-bs-target=".navbar-collapse.show"
                  >
                    เข้าสู่ระบบ
                  </li>
                </NavLink>
              </>
            )}

            <NavLink className="nav-link" to={'/cart'}>
              <li
                className="nav-item"
                data-bs-toggle="collapse"
                data-bs-target=".navbar-collapse.show"
              >
                <button type="button" className="btn position-relative">
                  <i className="fa-solid fa-cart-shopping"></i>
                  {count ? (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {count}
                      <span className="visually-hidden">unread messages</span>
                    </span>
                  ) : null}
                </button>
              </li>
            </NavLink>
            {user ? (
              <>
                <li
                  className="nav-item"
                  data-bs-toggle="collapse"
                  data-bs-target=".navbar-collapse.show"
                >
                  <div className="nav-link" onClick={() => logout()}>
                    ออกจากระบบ
                  </div>
                </li>
              </>
            ) : null}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
