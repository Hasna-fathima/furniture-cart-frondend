import '../index.css'
import homeimage from '../../images/homeimage.jpg';
import { MdOutlineLocalShipping } from "react-icons/md";
import { CgSupport } from "react-icons/cg";
import { CiShoppingBasket } from "react-icons/ci";
import { MdAssignmentReturn } from "react-icons/md";
import Topcategories from '../pages/Topcategories'


function Home() {
  return (
    <div>
     
    <div className='container3'>
      <div className="home"> 
        <div className='contentcontainer'>
          <h2>Modern Interior Design Studio</h2>
          <p>The Distinct Style Focus On Simple Form And Function, <br/>Which Are Available As Equals Under This Style</p>
          <button>Shop Now</button>
        </div>
        <div className='imagecontainer'>
          <img src={homeimage} alt="Home" />
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
   <Topcategories/>

   </div>
  );
}

export default Home;