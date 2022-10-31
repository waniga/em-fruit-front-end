import axios from '../config/axios';

export const getProduct = () => axios.get('/product');
