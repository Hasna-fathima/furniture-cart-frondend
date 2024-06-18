import React from 'react';
import '../index.css'; 
import { Link } from 'react-router-dom'; // Assuming you're using React Router
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const AdminHeader = () => {
  return (
    <header>
    <img className="logo" src="images/furniture1.jpg" alt="logo" />
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
          <Link className="navbar-brand nav-link text-warning-emphasis fs-8" to="/">Admin Dashboard</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/admin/dashboard">Dashboard</Link>
              </li>
              <li className="nav-item">
              <Link className="nav-link text-warning-emphasis fs-8" to="/admin/home">Home</Link>
              </li>
              <li className="nav-item">
              <Link className="nav-link text-warning-emphasis fs-8"to="/admin/users">Users</Link>
              </li>
              <li className="nav-item">
              <Link className="nav-link text-warning-emphasis fs-8" to="/admin/products">Products</Link>
              </li>
              <li className="nav-item">
                 <Link className="nav-link text-warning-emphasis fs-8" to="/admin/orders">Orders</Link>
              </li>
              <li className="nav-item">
              <Link className="nav-link text-warning-emphasis fs-8" to="/admin/settings">Settings</Link>
              </li>
              <li className="nav-item">
              <Link className="nav-link text-warning-emphasis fs-8" to="/admin/logout">Logout</Link>
              </li>
              
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default AdminHeader