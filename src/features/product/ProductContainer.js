import { useEffect, useState } from 'react';
import { getProduct } from '../../api/productApi';
import { useProduct } from '../../contexts/ProductContext';
import Container from '../../layouts/container/Container';
import Header from '../../layouts/header/Header';
import './product.css';

function ProductContainer() {
  const [dataList, setDataList] = useState();
  const { addItemToCart } = useProduct();

  useEffect(() => {
    const fetchProductList = async () => {
      try {
        const res = await getProduct();
        const { data } = res.data;
        setDataList(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchProductList();
  }, []);

  return (
    <>
      <Header />
      <Container>
        <div className="container ">
          <div className="row py-3">
            {dataList?.map((item, keys) => {
              return (
                <div className="col-sm-6 col-md-4 col-lg-3 p-3" key={keys}>
                  <div className="card">
                    <div className="card-img-top image">
                      <img
                        src={item?.image}
                        className="img img-responsive full-width"
                      />
                    </div>
                    <div className="card-body">
                      <h5 className="card-title">{item?.name}</h5>
                      <p className="card-text d-flex justify-content-between align-items-center flex-wrap ">
                        <span>{item?.price} บาท</span>
                        <button
                          type="button"
                          className="btn btn-primary btn-circle"
                          onClick={() => addItemToCart(item)}
                        >
                          <i className="fa-solid fa-cart-plus"></i>
                        </button>
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </>
  );
}

export default ProductContainer;