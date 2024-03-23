import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../../../FirebaseConfig';
import { collection, getDocs, query, where } from "firebase/firestore"
import { CartContext } from '../../../Context/CartContextProvider';
import { CardSkeleton } from '../../common/CardSkeleton';

// Material-UI Imports
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import TextField from '@mui/material/TextField';


const ItemDetailContainer = () => {
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { productId } = useParams();
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    let productsCollection = collection(db, "products");
    let consulta = productsCollection;

    if (productId) {
      let productsCollectionFiltered = query(
        productsCollection,
        where("id", "==", productId)
      );
      consulta = productsCollectionFiltered;
    } else {
      consulta = productsCollection;
    }

    getDocs(consulta)
      .then((res) => {
        let arrayLindo = res.docs.map((elemento, index) => {
          return { ...elemento.data(), id: elemento.id, key: index };
        });

        setProduct(arrayLindo[0]);
      })
      .finally(() => console.log('finish'));
  }, [productId]);

  if (!product) {
    return (
      <>
        <CardSkeleton />
      </>
    );
  }

  return (
    <div className="item-detail-container">
      <div className="item-image">
        <img src={`../../../assets/${product.imageName}.${product.extension}`} alt={product.title} />
      </div> 
      <div className="item-info">
        <h2>{product.title}</h2>
        <p>{product.desc}</p>
        <h3>Price: ${product.price}</h3>

        <div className="quantity-control" style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
          <Button 
            variant="outlined" 
            onClick={() => setQuantity(Math.max(quantity - 1, 1))}
            style={{ marginRight: '5px' }}
          >
            <RemoveIcon />
          </Button> 
          <TextField
  type="number"
  value={quantity} style={{ width: '18px!important' }}/>
          <Button 
            variant="outlined" 
            onClick={() => setQuantity(quantity + 1)}
            style={{ marginLeft: '5px' }}
          >
            <AddIcon />
          </Button> 
        </div>

        <Button 
          variant="contained" 
          onClick={() => addToCart(product, quantity)}
          endIcon={<ShoppingCartIcon />}
        >
          Agregar al carrito
        </Button>
      </div>
    </div>
  );
};

export default ItemDetailContainer;