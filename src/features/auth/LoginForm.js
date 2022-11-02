import { useState } from 'react';
import { toast } from 'react-toastify';
import { useAuth } from '../../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

function LoginForm() {
  const { login } = useAuth();
  let navigate = useNavigate();

  const [input, setInput] = useState({
    emailOrMobile: '',
    password: ''
  });

  const handleChangeInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    try {
      await login(input);
      toast.success('success login');
      navigate('/');
    } catch (err) {
      toast.error(err.response.data.message);
    } finally {
    }
  };

  return (
    <form className="login-main" onSubmit={handleSubmitForm}>
      <div className="container mx-auto main d-flex flex-column justify-content-center box-login">
        <div className="panel">
          <div className="text-center">
            <p className="fs-4">เข้าสู่ระบบ</p>
          </div>
          <div className="panel-content">
            <div className="mb-3">
              <label htmlFor="email-control" className="form-label">
                อีเมล์
              </label>
              <input
                type="email"
                className="form-control"
                id="email-control"
                placeholder="user@gmail.com"
                name="emailOrMobile"
                value={input.emailOrMobile}
                onChange={handleChangeInput}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password-control" className="form-label">
                รหัสผ่าน
              </label>
              <input
                type="password"
                className="form-control"
                id="password-control"
                placeholder="**********"
                name="password"
                value={input.password}
                onChange={handleChangeInput}
              />
            </div>
            <div className=" d-flex justify-content-end">
              <Link className=" text-black" to={'/register'}>
                สมัครสมาชิก
              </Link>
            </div>
            <div className="mb-3 text-center">
              <button type="submit" className="btn bt-main bt-color">
                เข้าสู่ระบบ
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default LoginForm;
