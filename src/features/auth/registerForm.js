import { useState } from 'react';
import { toast } from 'react-toastify';
import { useAuth } from '../../contexts/AuthContext';
import { validateRegister } from '../../validations/userValidate';

function RegisterForm() {
  const { register } = useAuth();

  const [input, setInput] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: ''
  });

  const handleChangeInput = (e) => {
    let value = e.target.value;
    if (e.target.name === 'phoneNumber') {
      value = value.slice(0, 10);
      console.log('value', value);
    }

    setInput({ ...input, [e.target.name]: value });
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    const { error } = validateRegister(input);
    if (error) {
      return toast.error(error.message);
    }
    try {
      await register(input);
      toast.success('success register');
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  return (
    <form className="register-form" onSubmit={handleSubmitForm}>
      <div className="container mx-auto main d-flex flex-column justify-content-center box-register">
        <div className="panel">
          <div className="text-center">
            <p className="fs-4">สมัครสมาชิก</p>
          </div>
          <div className="panel-content">
            <div className="mb-3">
              <label htmlFor="first-name-control" className="form-label">
                ชื่อ
              </label>
              <input
                name="firstName"
                type="text"
                className="form-control"
                id="first-name-control"
                placeholder="กมล"
                value={input.firstName}
                onChange={handleChangeInput}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="last-name-control" className="form-label">
                นามสกุล
              </label>
              <input
                type="text"
                name="lastName"
                className="form-control"
                id="last-name-control"
                placeholder="จันโอชา"
                value={input.lastName}
                onChange={handleChangeInput}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="phone-number-control" className="form-label">
                เบอร์โทรศัพท์
              </label>
              <input
                name="phoneNumber"
                type="number"
                className="form-control"
                id="phone-number-control"
                placeholder="0875555555"
                value={input.phoneNumber}
                onChange={handleChangeInput}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email-control" className="form-label">
                อีเมล์
              </label>
              <input
                name="email"
                type="email"
                className="form-control"
                id="email-control"
                placeholder="user@gmail.com"
                value={input.email}
                onChange={handleChangeInput}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password-control" className="form-label">
                รหัสผ่าน
              </label>
              <input
                name="password"
                type="password"
                className="form-control"
                id="password-control"
                placeholder="**********"
                value={input.password}
                onChange={handleChangeInput}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="confirm-password-control" className="form-label">
                ยืนยันรหัสผ่าน
              </label>
              <input
                name="confirmPassword"
                type="password"
                className="form-control"
                id="confirm-password-control"
                placeholder="**********"
                value={input.confirmPassword}
                onChange={handleChangeInput}
              />
            </div>
            <div className="mb-3 text-center">
              <button type="submit" className="btn bt-main bt-color">
                สมัครสมาชิก
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
export default RegisterForm;
