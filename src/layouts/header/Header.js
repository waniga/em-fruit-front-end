import { Link } from 'react-router-dom';
import { useProduct } from '../../contexts/ProductContext';
import AppLogo from '../../assets/images/logo.svg';

function Header() {
  const { count } = useProduct();
  return (
    <nav className="navbar navbar-expand-lg bg-nav fixed-top">
      <div className="container-fluid">
        <Link className="navbar-brand" to={'/'}>
          <img className="app-logo" src={AppLogo} alt="logo" />
        </Link>
        <div className="d-flex">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="true"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav nav-menu d-flex justify-content-center align-items-center">
            <li className="nav-item">
              <Link className="nav-link" to={'/'}>
                หน้าแรก
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={'/product'}>
                ผลไม้สด
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={'/about'}>
                เกี่ยวกับเรา
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={'/login'}>
                เข้าสู่ระบบ
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={'/cart'}>
                <button type="button" className="btn position-relative">
                  <i className="fa-solid fa-cart-shopping"></i>
                  {count ? (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {count}
                      <span className="visually-hidden">unread messages</span>
                    </span>
                  ) : null}
                </button>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
