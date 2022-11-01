import axios from '../config/axios';

export const buyOrder = (input) => axios.post('/order/buy', input);
export const getOrderList = () => axios.get('/order/list');
export const getOrderDetail = (id) => axios.get(`/order/detail/${id}`);
