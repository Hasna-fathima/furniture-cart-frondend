import {useState,useEffect}from 'react';
import '/src/index.css';

 function Topcategories() {

  const [Topcategory,setTopCategry]=useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/user/category")
    .then(res=>res.json())
    .then(json=>setTopCategry(json))
  },[])

  
 
  return (
    <div className='container'>
        <section className='my-4'>
            <main>
                <h3>Our Top Furniture Categories</h3>

                <div className='container d-flex flex-rowgap-3'>
                <div className="card " style={{ width: "10rem" }}>
                <ul className='productlist'>
                  {
                 Topcategory.map(category =>
                  <li key={category.id}className='category'>
                      <img src={category.image} className="card-img-top"></img>
                      <div className='card-body'>
                        <h3  className="card-title">{category.slug} </h3>
                      </div>
                   </li>)
                  }
               </ul>
               </div>
               </div>
            
            </main>
        </section>
      
    </div>
  )
}
export default Topcategories


