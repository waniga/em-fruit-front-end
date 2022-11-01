import Container from '../../layouts/container/Container';
import Header from '../../layouts/header/Header';
import './about.css';

function AboutContainer() {
  return (
    <>
      <Header />
      <Container>
        <div className="bg-about">
          <div className="w-100 h-100 d-flex flex-column justify-content-center align-items-center">
            <div className="d-flex flex-column justify-content-center align-items-center p-5 box-content">
              <p className="fs-1 fw-bold">EM FRUIT </p>
              <p className="fs-3 fw-semibold text-center">
                เป็นแบรนด์จำหน่ายผลไม้สดจานสวน ถึงผู้บริโภคโดยตรง
                เพื่อตอบโจทย์คนสมัยใหม่ที่ต้องการ ความสะดวก สบาย
                ให้เข้าถึงผลไม้คุณภาพเยี่ยมได้ง่ายขึ้น
              </p>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}

export default AboutContainer;
