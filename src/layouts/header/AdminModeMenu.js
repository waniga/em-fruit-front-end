import { NavLink } from 'react-router-dom';
import { useProduct } from '../../contexts/ProductContext';
import { useAuth } from '../../contexts/AuthContext';

export const AdminModeMenu = () => {
  const { user, logout } = useAuth();
  const { count } = useProduct();
  return (
    <ul className="navbar-nav nav-menu d-flex justify-content-center align-items-center">
      <NavLink className="nav-link" to={'/admin-order'}>
        <li
          className="nav-item"
          data-bs-toggle="collapse"
          data-bs-target=".navbar-collapse.show"
        >
          รายการสั่งซื้อ
        </li>
      </NavLink>
      <li
        className="nav-item"
        data-bs-toggle="collapse"
        data-bs-target=".navbar-collapse.show"
      >
        <div className="nav-link" onClick={() => logout()}>
          ออกจากระบบ
        </div>
      </li>
    </ul>
  );
};
