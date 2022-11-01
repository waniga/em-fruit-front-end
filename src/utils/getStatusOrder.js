import {
  ORDER_PREPARING,
  ORDER_SHIPPING,
  ORDER_SUCCESS
} from '../config/constants';

export const getStatusOrder = (status) => {
  let thaiWording = '';
  switch (status) {
    case ORDER_PREPARING:
      thaiWording = 'กำลังจัดเตรียมสินค้า';
      break;
    case ORDER_SHIPPING:
      thaiWording = 'กำลังจัดส่ง';
      break;
    case ORDER_SUCCESS:
      thaiWording = 'จัดส่งแล้ว';
      break;

    default:
      break;
  }
  return thaiWording;
};
