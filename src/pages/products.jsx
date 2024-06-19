import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../index.css';
import { Link } from 'react-router-dom';


const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchProducts(); // Fetch products when the component mounts
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('https://furniture-cart-5.onrender.com/api/user/products');
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
        </div>
    );
};

export default Products;