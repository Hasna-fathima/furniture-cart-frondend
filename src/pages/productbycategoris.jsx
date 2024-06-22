import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; 

function ProductsByCategory() {
  const { id } = useParams(); // Use category ID from the URL
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, [id]);

  const fetchProducts = () => {
    fetch(`https://furniture-cart-5.onrender.com/api/user/products?category=${id}`)
      .then(res => res.json())
      .then(json => setProducts(json))
      .catch(error => console.error('Error fetching products:', error));
  };

  return (
    <div className='container'>
      <section className='my-4'>
        <main>
          <h3 className="text-center mb-4">Products in Category</h3>
          <div className='row justify-content-around'>
            {products.map(product => (
              <div key={product.id} className='col-md-4 mb-4'>
                <div className="card" style={{ height: '100%' }}>
                  <img src={product.image} className="card-img-top img-fluid" style={{ height: '250px', objectFit: 'cover' }} alt={product.name} />
                  <div className='card-body'>
                    <h5 className="card-title text-center">{product.name}</h5>
                    <p className="card-text text-center">${product.price}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </section>
    </div>
  );
}

export default ProductsByCategory;
