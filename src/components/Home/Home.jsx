import React, { useEffect } from 'react';
import style from './Home.module.css'; 
import logo from '../../Assets/logo.png';
import { Helmet } from "react-helmet";
import Swal from 'sweetalert2'; 
import AOS from 'aos';
import 'aos/dist/aos.css'; 
import { Link, useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  const Swal = require('sweetalert2')

  useEffect(() => {
    AOS.init({ duration: 1000 }); 
  }, []);

  const handleStartClick = (e) => {
    const token = localStorage.getItem('Token'); 

    if (!token) {
      e.preventDefault(); 
      Swal.fire({
        icon: 'error',
        title: 'يجب تسجيل الدخول اولاً',
        text: 'يرجى تسجيل الدخول للوصول الى الدروس',
        confirmButtonText: 'حسناً',
      });
    } else {
      navigate('/Lessons'); 
    }
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>ا/ جيهان عبد الغفور</title>
      </Helmet>

      <div className={`Home ${style.landing}`}>
        <div className={`${style.content} d-flex flex-wrap justify-content-center align-items-center`}>
          <div className={`${style.imgContent} col-md-5 col-12 text-center`} data-aos="fade-right">
            <img src={logo} alt="logo" className={`w-75 ${style.roundedImage}`} />
          </div>

          <div className={`${style.textContent} col-md-6 col-12 text-center text-md-start mt-4 mt-md-.`} data-aos="fade-left">
            <h1 dir="rtl" className={`${style.title}`}>
              مدربة القدرات <br />ا/ جيهان عبد الغفور
            </h1>
            <p dir="rtl" className={`${style.description}`}>
              نقدم لطلبة كبار بيئة تعليمية متكاملة تهدف إلى تنمية القدرات الذهنية، المهارات الشخصية، والمهارات العملية التي تساعدهم على تحقيق أهدافهم الأكاديمية والمهنية.
            </p>
            <Link 
              to={'/Lessons'} 
              className={`text-decoration-none ${style.btn}`}
              onClick={handleStartClick}
            >
              ابدأ الآن
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;