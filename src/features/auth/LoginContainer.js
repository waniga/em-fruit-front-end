import Container from '../../layouts/container/Container';
import Header from '../../layouts/header/Header';
import LoginForm from './LoginForm';

function LoginContainer() {
  return (
    <div className="container-fluid">
      <Header />
      <Container>
        <div className="row bg-gray">
          <div className="col-12 col-lg-12 ">
            <LoginForm />
          </div>
        </div>
      </Container>
    </div>
  );
}

export default LoginContainer;
