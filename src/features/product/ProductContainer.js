import { useEffect, useState } from 'react';
import { getProduct } from '../../api/productApi';
import { useProduct } from '../../contexts/ProductContext';
import { formatNumber } from '../../utils/numberFormat';
import './product.css';

function ProductContainer() {
  const [dataList, setDataList] = useState([]);
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
      <div className="container">
        {dataList.length > 0 ? (
          <div className="row py-3">
            {dataList?.map((item, keys) => {
              return (
                <div className="col-sm-6 col-md-4 col-lg-3 p-3" key={keys}>
                  <div className="card">
                    <div className="card-img-top image">
                      <img
                        src={item?.image}
                        alt={item?.id}
                        className="img img-responsive full-width"
                      />
                    </div>
                    <div className="card-body">
                      <h5 className="card-title fw-bold">{item?.name}</h5>
                      <p className="card-text d-flex justify-content-between align-items-center flex-wrap ">
                        <span className=" fw-semibold">
                          {formatNumber(item?.price)} บาท
                        </span>
                        <button
                          type="button"
                          className="btn btn-primary btn-circle"
                          onClick={() => addItemToCart(item)}
                        >
                          <i className="fa-solid fa-cart-plus "></i>
                        </button>
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center d-flex justify-content-center align-items-center main-container fs-3">
            <span>ไม่มีข้อมูลรายการสินค้า</span>
            <i className="fa-solid fa-apple-whole m-4"></i>
          </div>
        )}
      </div>
    </>
  );
}

export default ProductContainer;
