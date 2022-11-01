import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { getOrderAdminList, updateOrderStatus } from '../../api/orderApi';
import {
  ORDER_PREPARING,
  ORDER_SHIPPING,
  ORDER_SUCCESS
} from '../../config/constants';
import { useAuth } from '../../contexts/AuthContext';
import { useProduct } from '../../contexts/ProductContext';
import Container from '../../layouts/container/Container';
import Header from '../../layouts/header/Header';
import { formatNumber } from '../../utils/numberFormat';
import './order.css';

function AdminOrderContainer() {
  let navigate = useNavigate();
  const [dataList, setDataList] = useState([]);
  const { cardItem, addItemToCart, removeItemToCart, total, clearCart } =
    useProduct();
  const { user } = useAuth();
  console.log('user', user);

  useEffect(() => {
    const fetchOrderList = async () => {
      try {
        const res = await getOrderAdminList();
        const { data } = res.data;
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

  const onSave = async (item) => {
    try {
      console.log(item);
      const input = { orderId: item.id, orderStatus: item.orderStatus };
      const res = await updateOrderStatus(input);
      console.log('updateOrderStatus', res);
      if (res.status === 201) {
        console.log('react-toastify');
        await toast.success(`Update orderId:${item.id} Done!`);
      }
    } catch (err) {
      await toast.error(`Update orderId:${item.id} Fail!`);
      console.log(err);
    }
  };
  const selectChange = (event, index) => {
    const newArr = [...dataList];
    newArr[index].orderStatus = event.target.value;
    setDataList(newArr);
  };
  return (
    <>
      <Header />
      <Container>
        <div className="container  py-5">
          <div className="row">
            <div className="card">
              <h5 className="card-title text-center card-green">
                <span> รายการสั่งซื้อของลูกค้า</span>
                <i className="fa-solid fa-clock-rotate-left ms-4 "></i>
              </h5>
              <div className="card-body">
                <div className="card-text">
                  <table className="table">
                    <thead>
                      <tr>
                        <th className="text-center" scope="col">
                          รหัส Order
                        </th>
                        <th className="text-center" scope="col">
                          จำนวนรายการสินค้า
                        </th>
                        <th className="text-center" scope="col">
                          ราคารวม
                        </th>
                        <th className="text-center" scope="col">
                          จัดการสถานะ
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {dataList.length > 0 ? (
                        dataList.map((item, keys) => {
                          return (
                            <tr className="cart-table-center" key={keys}>
                              <td className="fw-semibold">{item?.id}</td>
                              <td>{item?.OrderItems.length}</td>
                              <td>{formatNumber(item?.total)}</td>
                              <td>
                                <div className="d-flex">
                                  <select
                                    className="form-select form-select-sm"
                                    onChange={(event) =>
                                      selectChange(event, keys)
                                    }
                                    value={item.orderStatus}
                                  >
                                    <option value={ORDER_PREPARING}>
                                      กำลังจัดเตรียมสินค้า
                                    </option>
                                    <option value={ORDER_SHIPPING}>
                                      กำลังจัดส่ง
                                    </option>
                                    <option value={ORDER_SUCCESS}>
                                      จัดส่งแล้ว
                                    </option>
                                  </select>
                                  <button
                                    type="button"
                                    className="btn btn-success btn-save"
                                    onClick={() => onSave(item)}
                                  >
                                    <i className="fa-solid fa-floppy-disk"></i>
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr className="text-center">
                          <td colSpan={5}>ยังไม่มีรายการสั่งซื้อ</td>
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

export default AdminOrderContainer;
