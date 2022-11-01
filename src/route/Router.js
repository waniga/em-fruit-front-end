import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import AuthLayout from '../layouts/auth/AuthLayout';
import AdminOrderPage from '../pages/AdminOrderPage';
import CartPage from '../pages/CartPage';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import OrderDetailPage from '../pages/OrderDetailPage';
import OrderPage from '../pages/OrderPage';
import ProductPage from '../pages/ProductPage';
import RegisterPage from '../pages/RegisterPage';

function Router() {
  const { user } = useAuth();
  return (
    <Routes>
      {user ? (
        <Route path="/" element={<AuthLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/product" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/order" element={<OrderPage />} />
          <Route path="/admin-order" element={<AdminOrderPage />} />
          <Route path="/order/detail/:id" element={<OrderDetailPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      ) : (
        <>
          <Route path="/" element={<HomePage />} />
          <Route path="/product" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </>
      )}
    </Routes>
  );
}

export default Router;
