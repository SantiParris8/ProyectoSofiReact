import { createContext, useState } from "react";

export const CartContext = createContext();

const CartContextProvider = ({ children }) => {
  
  const [cart, setCart] = useState( JSON.parse( localStorage.getItem("cart") ) || [] ); 

const addToCart = (product, quantity) => {
  console.log('cart1')
  console.log(cart)
  
  console.log('product')
  console.log(product)

  console.log('quantity')
  console.log(quantity)

  let existe = isInCart(product.id);
product.quantity = quantity;
  if (existe) {
    console.log('')
    let newArray = cart.map((elemento) => {
      if (elemento.id === product.id) {
        console.log('eid is pid')
        return {
          ...elemento,
          quantity: elemento.quantity + product.quantity,
        };
      } else {
        console.log('else')
        return {
          
          elemento
        };
      }
    });


    setCart(newArray);
    localStorage.setItem("cart", JSON.stringify(newArray) );
  } else {
    console.log('else2')
    setCart([...cart, product]);
    localStorage.setItem("cart", JSON.stringify([...cart, product]) );
  }


  console.log('cart2')
  console.log(cart)
};

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart")
  };

  const isInCart = (id) => {
    let existe = cart.some((elemento) => elemento.id === id);
    return existe;
  };

  const removeById = (id) => {
    let newArray = cart.filter((elemento) => elemento.id !== id);
    setCart(newArray);
    localStorage.setItem( "cart", JSON.stringify(newArray))
  };

  const getTotalItems = () => {
    let total = cart.reduce((acc, elemento) => {
      return acc + elemento.quantity;
    }, 0);
    return total;
  };

  const getTotalPrice = () => {
    let total = cart.reduce((acc, elemento) => {
      return acc + elemento.quantity * elemento.price;
    }, 0);

    return total;
  };

  const getTotalQuantityById = (id) => {
    let product = cart.find((elemento) => elemento.id === id);

    if (product) {
      return product.quantity;
    } else {
      return product;
    }
  };

  let data = {
    cart,
    addToCart,
    clearCart,
    removeById,
    getTotalItems,
    getTotalPrice,
    getTotalQuantityById,
  };

  return <CartContext.Provider value={data}>{children}</CartContext.Provider>;
};

export default CartContextProvider;