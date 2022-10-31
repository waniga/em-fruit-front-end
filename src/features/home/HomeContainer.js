import Container from '../../layouts/container/Container';
import Header from '../../layouts/header/Header';
import './home.css';

function HomeContainer() {
  return (
    <>
      <Header />
      <Container>
        <div className="bg-home">
          <div className="w-50 h-100 d-flex flex-column justify-content-center align-items-center">
            <p className="fs-1 fw-bold">ผลไม้จากสวน EM FRUIT</p>
            <p className="fs-1 fw-semibold">สด สะอาด ปลอดภัย</p>
          </div>
        </div>
      </Container>
    </>
  );
}

export default HomeContainer;
