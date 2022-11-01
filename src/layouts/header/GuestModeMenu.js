import { NavLink } from 'react-router-dom';
import { useProduct } from '../../contexts/ProductContext';
import { useAuth } from '../../contexts/AuthContext';

export const GuestModeMenu = () => {
  const { user, logout } = useAuth();
  const { count } = useProduct();
  return (
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
      <NavLink className="nav-link" to={'/about'}>
        <li
          className="nav-item"
          data-bs-toggle="collapse"
          data-bs-target=".navbar-collapse.show"
        >
          เกี่ยวกับเรา
        </li>
      </NavLink>
      <NavLink className="nav-link" to={'/login'}>
        <li
          className="nav-item"
          data-bs-toggle="collapse"
          data-bs-target=".navbar-collapse.show"
        >
          เข้าสู่ระบบ
        </li>
      </NavLink>

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
    </ul>
  );
};
