import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { MdOutlineLocalShipping } from "react-icons/md";
import { CgSupport } from "react-icons/cg";
import { CiShoppingBasket } from "react-icons/ci";
import { MdAssignmentReturn } from "react-icons/md";

const SingleProduct = () => {
    const { Id } = useParams();
    console.log('Product ID from useParams:', Id);

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            if (!Id) {
                console.error('Product ID is undefined');
                setError('Invalid product ID');
                setLoading(false);
                return;
            }

            try {
                console.log('Fetching product with ID:', Id);
                const response = await axios.get(`https://furniture-cart-5.onrender.com/api/user/product/${Id}`);
                console.log('Product data:', response.data); 
                if(response.status ===200){
                    setProduct(response.data);
                }
                else{
                    setError("failed to fetch product details")
                }
                
                setLoading(false);
            } catch (error) {
                console.error('Error fetching product:', error); // Debugging: Log the error
                setError('Failed to fetch product details. Please try again later.');
                setLoading(false);
            }
        };

        fetchProduct();
    }, [Id]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    if (!product) {
        return <p>No product found</p>;
    }

    return (
        <div className="container">
            <div className="single-product">
                <div className="grid-container">
                    <div className="product-image">
                        <img
                            src={`https://res.cloudinary.com/dvhply5kh/image/upload/${product.imagePublicId}`}
                            alt={product.name}
                        />
                    </div>
                    <div className="product-info">
                        <h2>{product.name}</h2>
                        <p>{product.description}</p>
                        <p>&#8377;{product.price}</p>
                        <p>{product.category.name}</p>
                        <p>quantity: {product.quantity}</p>
                        <p>{product.review}</p>
                        <button >BuyNow</button>  <button>AddCart</button>
                        
                        
                    </div>
                </div>
               
          
            </div>

            <section>
    <div className='second'>
      <ul className='section2'>
        <li><MdOutlineLocalShipping /><br/>Fast &free <br/>shipping</li>
        <li><CiShoppingBasket /><br/>Easy to Shop</li>
        <li><CgSupport /><br/>24/7 Support</li>
        <li>< MdAssignmentReturn/><br/>Hassle Free <br/> Return</li>
      </ul>
    </div>


   </section>
            
        </div>
    );
};

export default SingleProduct;
