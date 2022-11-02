import { createContext, useContext, useState } from 'react';

const ProductContext = createContext();

function ProductContextProvider({ children }) {
  const [cardItem, setCartItem] = useState([]);
  const [count, setCount] = useState(0);
  const [total, setTotal] = useState(0);

  const addItemToCart = async (product) => {
    let newArr = [...cardItem];
    console.log('newArr', newArr);
    const updateIndex = newArr.findIndex((i) => i.id === product.id);
    if (updateIndex === -1) {
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

    if (updateIndex === -1) {
    } else {
      const item = newArr[updateIndex];
      let amount = 0;
      if (item.amount > 0) {
        amount = item.amount - 1;
      }
      item.amount = amount;
      item.sum = Number(item.price) * amount;
      newArr[updateIndex] = item;
    }

    const currentTotal = newArr.reduce(sum, 0);
    setTotal(currentTotal);
    setCartItem(newArr);
    setCount(newArr.length);
  };

  const deleteItemCart = async (product) => {
    let newArr = [...cardItem].filter((i) => i.id !== product.id);
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
        clearCart,
        deleteItemCart
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
