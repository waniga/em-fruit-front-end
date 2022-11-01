import { createContext, useContext, useEffect, useState } from 'react';
import * as authService from '../api/authApi';
import * as userService from '../api/userApi';
import {
  addAccessToken,
  getAccessToken,
  removeAccessToken
} from '../utils/localStorage';
import { formatNumber } from '../utils/numberFormat';

const ProductContext = createContext();

function ProductContextProvider({ children }) {
  const [cardItem, setCartItem] = useState([]);
  const [count, setCount] = useState(0);
  const [total, setTotal] = useState(0);

  const [orderList, setOrderList] = useState([]);

  // useEffect(() => {
  //   const fetchMe = async () => {
  //     try {
  //       if (getAccessToken()) {
  //         await getMe();
  //       }
  //     } catch (err) {
  //       console.log(err);
  //     } finally {
  //       setInitialLoading(false);
  //     }
  //   };
  // }, []);

  const addItemToCart = async (product) => {
    let newArr = [...cardItem];
    console.log('newArr', newArr);
    const updateIndex = newArr.findIndex((i) => i.id === product.id);
    if (updateIndex == -1) {
      newArr.push({
        ...product,
        amount: 1,
        sum: Number(product.price) * 1
      });
    } else {
      const item = newArr[updateIndex];
      const amount = item.amount + 1;
      item.amount = amount;
      item.sum = Number(item.price) * amount;
      newArr[updateIndex] = item;
    }
    const currentTotal = newArr.reduce(sum, 0);
    setTotal(currentTotal);
    setCartItem(newArr);
    setCount(newArr.length);
  };

  const sum = (acc, a) => {
    return acc + Number(a.sum);
  };

  const removeItemToCart = async (product) => {
    let newArr = [...cardItem];

    const updateIndex = newArr.findIndex((i) => i.id === product.id);
    console.log(updateIndex);

    if (updateIndex == -1) {
    } else {
      const item = newArr[updateIndex];
      const amount = item.amount - 1;

      if (amount != 0) {
        item.amount = amount;
        item.sum = Number(item.price) * amount;
        newArr[updateIndex] = item;
      } else {
        //delete product
        newArr = [...cardItem].filter((i) => i.id !== product.id);
      }
    }

    const currentTotal = newArr.reduce(sum, 0);
    setTotal(currentTotal);
    setCartItem(newArr);
    setCount(newArr.length);
  };

  const clearCart = () => {
    setTotal(0);
    setCartItem([]);
    setCount(0);
  };

  return (
    <ProductContext.Provider
      value={{
        total,
        count,
        setCount,
        cardItem,
        addItemToCart,
        removeItemToCart,
        clearCart
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export const useProduct = () => {
  return useContext(ProductContext);
};

export default ProductContextProvider;
