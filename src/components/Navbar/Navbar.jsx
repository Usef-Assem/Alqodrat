import React, { useState } from 'react';
import style from './Navbar.module.css';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../Assets/logo.png';
import axios from 'axios';
import toast from 'react-hot-toast';

function Navbar() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem('Token');

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(`https://jihan.org/public/api/logout`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      localStorage.removeItem("Token");
      toast.success('تم تسجيل الخروج بنجاح');
      navigate('/');
    } catch (error) {
      toast.error('فشل تسجيل الخروج');
      console.error('Logout failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <nav className={`navbar navbar-expand-lg ${style.navbar}`}>
      <div className="container">
        <Link className="navbar-brand" to={'/'}>
          <img src={logo} alt="logo" className={style.logo} />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mx-auto me-4 mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={`nav-link ${style.navLink}`} to={'/'}>
                الرئيسية
              </Link>
            </li>
          </ul>
          <div className="d-flex ms-auto">
            {token ? (
              <button
                className={`btn text-white ${style.RegisterBtn}`}
                onClick={handleLogout}
                disabled={isLoading}
              >
                {isLoading ? 'جاري تسجيل الخروج...' : 'تسجيل خروج'}
              </button>
            ) : (
              <>
                <Link className={`btn me-3 ${style.LoginBtn}`} to={'/Login'}>
                  تسجيل دخول
                </Link>
                <Link className={`btn text-white ${style.RegisterBtn}`} to={'/Register'}>
                  انشاء حساب
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;