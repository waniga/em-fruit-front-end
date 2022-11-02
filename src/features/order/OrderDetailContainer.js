import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getOrderDetail } from '../../api/orderApi';
import { getStatusOrder } from '../../utils/getStatusOrder';
import { formatNumber } from '../../utils/numberFormat';
import './order.css';

function OrderDetailContainer() {
  let { id } = useParams();
  let navigate = useNavigate();
  const [dataList, setDataList] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchOrderDetail = async () => {
      try {
        const res = await getOrderDetail(id);
        const { data } = res.data;
        setDataList(data);
        setOrderItems(data?.OrderItems);
        const total = data?.OrderItems.reduce(
          (acc, a) => acc + Number(a.price) * a.amount,
          0
        );
        setTotal(total);
      } catch (err) {
        console.log(err);
      }
    };
    fetchOrderDetail();
  }, [id]);
  return (
    <>
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
              <span>Order ID : {dataList?.id}</span>
            </h5>
            <h5 className="card-title text-center">
              <span>สถานะการจัดส่ง : </span>
              <span>{getStatusOrder(dataList?.orderStatus)}</span>
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
                    {orderItems?.length > 0 ? (
                      orderItems.map((item, keys) => {
                        console.log('Product', item.Product);
                        return (
                          <tr className="cart-table-center" key={keys}>
                            <td>
                              <img
                                src={item.Product.image}
                                className="img-thumbnail card-img"
                                alt={item.Product.name}
                              />
                            </td>
                            <td className="fw-semibold">{item.Product.name}</td>
                            <td>{formatNumber(item.price)}</td>
                            <td>{item?.amount}</td>
                            <td>
                              {formatNumber(Number(item.price) * item?.amount)}
                            </td>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderDetailContainer;
