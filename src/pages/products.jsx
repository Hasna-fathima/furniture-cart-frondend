import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../index.css';
import { Link } from 'react-router-dom';
import { MdOutlineLocalShipping } from "react-icons/md";
import { CgSupport } from "react-icons/cg";
import { CiShoppingBasket } from "react-icons/ci";
import { MdAssignmentReturn } from "react-icons/md";



const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchProducts(); // Fetch products when the component mounts
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/user/products');
            setProducts(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching products:', error);
            setError(error.message);
            setLoading(false);
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error fetching products: {error}</p>;
    }

    return (
       
        <div className='container'>
    
            <div className='grid-container'>
                {products.map((product) => (
                    <div key={product._id} className='card'>
                        <div className='card-flag-container'>
                            <Link to={`/singleproduct/${product._id}`}>
                                <img
                                    className='card-flag'
                                    src={`https://res.cloudinary.com/dvhply5kh/image/upload/${product.imagePublicId}`}
                                    alt={product.name}
                                />
                            </Link>
                        </div>
                        <div className='card-info'>
                            <h2>{product.name}</h2>
                            <p>{product.description}</p>
                            <p>&#8377;{product.price}</p>
                        </div>
                    </div>
                ))}
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

export default Products;