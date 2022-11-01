import AuthForm from './AuthForm';
import LoginForm from './LoginForm';

function AuthContainer() {
  return (
    <div className="container-fluid">
      <div className="mx-auto max-w-245">
        <div className="row">
          <div className="col-12 col-lg-6 ps-xl-0 tw-pt-10 tw-pt-lg-41 tw-ps-lg-10">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthContainer;
