import React from 'react';
import Header from '../components/Header';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem } from '../redux/slices/wishlistSlice';
import { addToCart } from '../redux/slices/cartSlice'; // ✅ Import missing addToCart

const Wishlist = () => {
  const userCart = useSelector(state => state.cartReducer);
  const userWishlist = useSelector(state => state.wishlistReducer);
  const dispatch = useDispatch();

  const handleCart = (product) => {
    const existingProduct = userCart?.find(item => item.id === product.id);

    if (existingProduct) {
      alert('Product already in cart');
    } else {
      dispatch(addToCart(product));
      alert('Product added to cart');
    }
  };

  return (
    <>
      <Header />
      <div style={{ paddingTop: '100px' }} className="px-5">
        {userWishlist?.length > 0 ? (
          <>
            <h1 className="text-4xl font-bold text-red-600">My Wishlist</h1>
            <div className="grid grid-cols-4 gap-4 mt-6">
              {userWishlist?.map(product => (
                <div key={product?.id} className="rounded border p-2 shadow">
                  <img 
                    width="100%" 
                    height="200px" 
                    src={product?.thumbnail || "https://cdn.shopify.com/s/files/1/0070/7032/articles/ecommerce_20shopping_20cart_4c343e41-1041-49d3-bca8-3d7d1aa06d90.png?v=1729263457"} 
                    alt={product?.title} 
                  />
                  <div className="text-center">
                    <h3 className="text-xl font-bold">{product?.title}</h3>
                    <div className="flex justify-evenly mt-3">
                      <button 
                        onClick={() => dispatch(removeItem(product?.id))} 
                        className="text-xl"
                      >
                        <i className="fa-solid fa-heart-circle-xmark text-red-600"></i>
                      </button>
                      <button 
                        onClick={() => handleCart(product)} 
                        className="text-xl"
                      >
                        <i className="fa-solid fa-cart-plus text-green-600"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="flex flex-col justify-center items-center h-screen">
            <img 
              className="w-100 h-1/2" 
              src="https://assets-v2.lottiefiles.com/a/6102a4f8-1176-11ee-bcc5-236dd7d5f88b/aK8IKRE5a3.gif" 
              alt="Empty Wishlist" 
            />
            <h1 className="text-3xl text-red-600 mt-4">Your wishlist is empty!!!</h1>
          </div>
        )}
      </div>
    </>
  );
};

export default Wishlist;
