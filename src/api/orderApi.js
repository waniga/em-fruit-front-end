import axios from '../config/axios';

export const buyOrder = (input) => axios.post('/order/buy', input);
export const getOrderList = () => axios.get('/order/list');
export const getOrderAdminList = () => axios.get('/order/list-admin');
export const getOrderDetail = (id) => axios.get(`/order/detail/${id}`);
export const updateOrderStatus = (input) =>
  axios.post('/order/update-status', input);
