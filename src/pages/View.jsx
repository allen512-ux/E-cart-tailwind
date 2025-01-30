import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToWishlist } from '../redux/slices/wishlistSlice';
import { addToCart } from '../redux/slices/cartSlice';

const View = () => {
  const dispatch= useDispatch()
  const userCart =useSelector(state=>state.cartReducer)
  const userWishlist =useSelector(state=>state.wishlistReducer)
  const [product, setProduct] = useState({});
  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    if (sessionStorage.getItem('allProducts')) {
      const allProducts = JSON.parse(sessionStorage.getItem('allProducts'));
      const foundProduct = allProducts.find((item) => item.id == id);
      console.log(foundProduct);
      if (foundProduct) {
        setProduct(foundProduct);  // Update the state with the found product
      }
    }
  }, [id]);
  const handleWishlist=()=>{
    const existingProduct =userWishlist?.find(item=>item?.id==id)
    if(existingProduct){
      alert('product already in wishlist')
    }else{
      dispatch(addToWishlist(product))
    }
  }

  const handleCart=()=>{
    dispatch(addToCart(product))
    const existingProduct=userCart?.find(item=>item.id==id)
    if(existingProduct){
      alert('product already incremented')
    }else{
      alert('product added to cart')
    }
  }

  return (
    <>
      <Header />
      <div className="flex flex-col mx-5">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-5 h-screen">
          {/* Product Image */}
          <img
            className="ml-10 md:ml-40"
            width="350px"
            height="250px"
            src={product?.thumbnail}
            alt="Product"
          />

          {/* Product Details */}
          <div className="space-y-4 pt-28">
            <h3 className="font-bold">pid: {product?.id}</h3>
            <h1 className="text-5xl font-bold">{product?.title}</h1>
            <h4 className="font-bold text-red-600 text-2xl">${product?.price}</h4>
            <h4>Brand: {product?.brand}</h4>
            <h4>Category: {product?.category}</h4>
            <p>
              <span className="font-bold">Description</span>: {product?.description}
            </p>
            
            {/* Buttons */}
            <div onClick={handleWishlist} className="flex justify-between mt-5">
              <button className="bg-blue-600 rounded text-white px-4 py-2">
                Add to Wishlist
              </button>
              <button onClick={handleCart} className="bg-green-600 rounded text-white px-4 py-2">
                Add to Cart
              </button>
            </div>

            {/* Client Reviews */}
            <h3 className="font-bold mt-4">Client Review</h3>
            {product?.reviews?.length > 0 ? (
              product.reviews.map((item) => (
                <div key={item?.date} className="shadow rounded p-2 mb-2">
                  <h5>
                    <span className="font-bold">{item?.reviewerName}</span> :
                    <span>{item?.comment}</span>
                  </h5>
                  <p>
                    Rating: {item?.rating} <i className="fa-solid fa-star text-yellow-500"></i>
                  </p>
                </div>
              ))
            ) : (
              <div className="font-bold text-red-600">No Review Yet</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default View;