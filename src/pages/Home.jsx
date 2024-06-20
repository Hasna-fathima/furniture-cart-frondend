import '../index.css'
import homeimage from '../../images/homeimage.jpg'

function Home() {
  return (
    <div className='container3'>
      <div className="home"> 
        <div className='contentcontainer'>
          <h2>Modern Interior Design Studio</h2>
          <p>The Distinct Style Focus On Simple Form And Function, <br/>Which Are Available As Equals Under This Style</p>
          <button>Shop Now</button>
        </div>
        <div className='imagecontainer'>
          <img src={homeimage} />
        </div>  
      </div>
    </div>
  );
}

export default Home;