import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { Link } from 'react-router-dom';

function Topcategories() {
  const [Topcategory, setTopCategory] = useState([]);

  useEffect(() => {
    fetch("https://furniture-cart-5.onrender.com/api/user/category")
      .then(res => res.json())
      .then(json => setTopCategory(json))
      .catch(error => console.error('Error fetching categories:', error));
  }, []);

  return (
    <div className='container'>
      <section className='my-4'>
        <main>
          <h3 className="text-center mb-4">Our Top Furniture Categories</h3>

          <div className='row justify-content-around'>
            {Topcategory.map(category => (
              <div key={category.id} className='col-md-4 mb-4'>
                <div className="card" style={{ height: '100%' }}>
                  <Link to={`/productbycategory/${category.id}`}>
                    <img src={category.image} className="card-img-top img-fluid" style={{ height: '250px', objectFit: 'cover' }} alt={category.slug} />
                  </Link>
                  <div className='card-body'>
                    <h5 className="card-title text-center">{category.name}</h5>
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

export default Topcategories;
