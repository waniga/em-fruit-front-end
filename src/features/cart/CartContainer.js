import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { buyOrder } from '../../api/orderApi';
import { useAuth } from '../../contexts/AuthContext';
import { useProduct } from '../../contexts/ProductContext';
import Container from '../../layouts/container/Container';
import Header from '../../layouts/header/Header';
import { formatNumber } from '../../utils/numberFormat';
import './cart.css';

function CartContainer() {
  let navigate = useNavigate();
  const [dataList, setDataList] = useState();
  const { cardItem, addItemToCart, removeItemToCart, total, clearCart } =
    useProduct();
  const { user } = useAuth();
  console.log('cardItem', cardItem);
  console.log('user', user);

  // useEffect(() => {
  //   const fetchProductList = async () => {
  //     try {
  //       const res = await getProduct();
  //       const { data } = res.data;
  //       setDataList(data);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   fetchProductList();
  // }, []);

  const onSubmit = async () => {
    if (!user) {
      return navigate('/login');
    }
    try {
      const input = { order: cardItem };
      const res = await buyOrder(input);
      if (res.status === 201) {
        clearCart();
        navigate(`/order`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Header />
      <Container>
        <div className="container  py-5">
          <div className="row">
            <div>
              <button
                type="button"
                className="btn btn-primary btn-circle mb-2"
                onClick={() => navigate(-1)}
              >
                <i className="fa-solid fa-arrow-left "></i>
              </button>
            </div>
            <div className="card">
              <h5 className="card-title text-center card-green">
                <span>สรุปรายการสั่งซื้อ</span>
                <i className="fa-solid fa-cart-shopping ms-4 "></i>
              </h5>
              <div className="card-body">
                <div className="card-text">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th className="text-center" scope="col">
                          ภาพสินค้า
                        </th>
                        <th className="text-center" scope="col">
                          ชื่อสินค้า
                        </th>
                        <th className="text-center" scope="col">
                          ราคา
                        </th>
                        <th className="text-center" scope="col">
                          จำนวน
                        </th>
                        <th className="text-center" scope="col">
                          ราคาสุทธิ
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {cardItem.length > 0 ? (
                        cardItem.map((item, keys) => {
                          return (
                            <tr className="cart-table-center" key={keys}>
                              <td>
                                <img
                                  src={item.image}
                                  className="img-thumbnail card-img"
                                  alt={item.name}
                                />
                              </td>
                              <td className="fw-semibold">{item.name}</td>
                              <td>{formatNumber(item.price)}</td>
                              <td>
                                <button
                                  type="button"
                                  className="btn btn-primary btn-cart"
                                  onClick={() => addItemToCart(item)}
                                >
                                  <i className="fa-solid fa-plus"></i>
                                </button>
                                <span>{item.amount}</span>
                                <button
                                  type="button"
                                  className="btn btn-danger btn-cart"
                                  onClick={() => removeItemToCart(item)}
                                >
                                  <i className="fa-solid fa-minus"></i>
                                </button>
                              </td>
                              <td>{formatNumber(item.sum)}</td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr className="text-center">
                          <td colSpan={5}>ยังไม่มีรายการสินค้า</td>
                        </tr>
                      )}
                      <tr className="text-center fw-bolder ">
                        <td colSpan="3"></td>
                        <td>รวมเป็นเงิน</td>
                        <td>{formatNumber(total)}</td>
                      </tr>
                    </tbody>
                  </table>
                  {total > 0 ? (
                    <div className=" d-flex justify-content-end me-2">
                      <button
                        type="button"
                        className="btn btn-success"
                        onClick={onSubmit}
                      >
                        สั่งซื้อสินค้า
                      </button>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}

export default CartContainer;
