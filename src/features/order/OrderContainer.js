import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { buyOrder, getOrderDetail, getOrderList } from '../../api/orderApi';
import { useAuth } from '../../contexts/AuthContext';
import { useProduct } from '../../contexts/ProductContext';
import Container from '../../layouts/container/Container';
import Header from '../../layouts/header/Header';
import { getStatusOrder } from '../../utils/getStatusOrder';
import { formatNumber } from '../../utils/numberFormat';
import './order.css';

function OrderContainer() {
  let navigate = useNavigate();
  const [dataList, setDataList] = useState([]);
  const { cardItem, addItemToCart, removeItemToCart, total, clearCart } =
    useProduct();
  const { user } = useAuth();
  console.log('user', user);

  useEffect(() => {
    const fetchOrderList = async () => {
      try {
        const res = await getOrderList();
        const { data } = res.data;
        console.log('getOrderList', data);
        // setDataList(data);
        const mapData = data.map((item) => {
          const total = item.OrderItems.reduce(
            (acc, a) => acc + Number(a.price) * a.amount,
            0
          );
          return {
            ...item,
            total
          };
        });
        setDataList(mapData);
      } catch (err) {
        console.log(err);
      }
    };
    fetchOrderList();
  }, []);

  const onClick = async (item) => {
    try {
      console.log(item);
      // const input = { order: cardItem };
      // const res = await getOrderDetail(item.id);
      // console.log(res.data);
      // const { order } = res.data;
      if (item.id !== null) {
        navigate(`/order/detail/${item?.id}`);
      }
    } catch (err) {
      console.log(err);
    }
  };
  console.log('dataList', dataList);
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
                <span> ประวัติการสั่งซื้อ</span>
                <i className="fa-solid fa-clock-rotate-left ms-4 "></i>
              </h5>
              <div className="card-body">
                <div className="card-text">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th className="text-center" scope="col">
                          รหัส Order
                        </th>
                        <th className="text-center" scope="col">
                          จำนวนรายการสินค้า
                        </th>
                        <th className="text-center" scope="col">
                          สถานะการจัดส่ง
                        </th>
                        <th className="text-center" scope="col">
                          ราคารวม
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {dataList.length > 0 ? (
                        dataList.map((item, keys) => {
                          return (
                            <tr
                              className="cart-table-center"
                              key={keys}
                              onClick={() => onClick(item)}
                            >
                              <td className="fw-semibold">{item?.id}</td>
                              <td>{item?.OrderItems.length}</td>
                              <td>{getStatusOrder(item?.orderStatus)}</td>
                              <td>{formatNumber(item?.total)}</td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr className="text-center">
                          <td colSpan={4}>ยังไม่มีรายการสั่งซื้อ</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}

export default OrderContainer;
