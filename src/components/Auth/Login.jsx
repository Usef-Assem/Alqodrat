import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import style from './Auth.module.css';
import { Helmet } from 'react-helmet';

export default function Login() {
  let navigate = useNavigate();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  

  const fetchData = async (values) => {
    setIsLoading(true);
    try {
      const response = await axios.post(`https://jihan.org/public/api/login`, values);
      const data = response.data;
      console.log(data);
      localStorage.setItem('Token', data.token);
      setIsLoading(false);
      navigate('/');
    } catch (error) {
      setIsLoading(false);
      setError(error.response?.data?.message || 'Something went wrong');
      console.error('Error fetching data:', error);
    }
  };

  let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
  let validateScheme = yup.object({
    email: yup.string().email('بريد الكتروني غير صالح').required('هذا الحقل مطلوب'),
    password: yup
      .string()
      .matches(passwordRegex, 'يجب ان تحتوي كلمة السر علي حروف كبيرة و ارقام')
      .required('هذا الحقل مطلوب'),
  });

  let formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validateScheme,
    onSubmit: fetchData,
  });

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>تسجيل الدخول</title>
      </Helmet>

      <div className={style.Register}>
        <div className="d-flex justify-content-center align-items-center min-vh-100">
          <div className="col-md-6 col-lg-5 col-11">
            <div className={`${style.authCard} p-4 p-md-5 rounded-3 shadow`}>
              <h1 className={`text-center ${style.authTitle}`}>تسجيل دخول</h1>
              {error !== '' ? (
                <div className={`alert ${style.errorAlert} text-center mt-3`}>{error}</div>
              ) : (
                ''
              )}
              <form onSubmit={formik.handleSubmit} className="mt-4">
                <div className="mb-3">
                  <input
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="email"
                    id="E-mail"
                    className={`form-control ${style.authInput}`}
                    type="email"
                    placeholder="ادخل البريد الاكتروني"
                  />
                  {formik.errors.email && formik.touched.email ? (
                    <div className={`alert ${style.errorAlert} mt-2`}>{formik.errors.email}</div>
                  ) : (
                    ''
                  )}
                </div>

                <div className="mb-3">
                  <input
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="password"
                    id="Password"
                    className={`form-control ${style.authInput}`}
                    type="password"
                    placeholder="ادخل كلمة السر"
                  />
                  {formik.errors.password && formik.touched.password ? (
                    <div className={`alert ${style.errorAlert} mt-2`}>{formik.errors.password}</div>
                  ) : (
                    ''
                  )}
                </div>

                {isLoading ? (
                  <button className={`btn ${style.authButton} w-100 mt-3`} type="submit" disabled>
                    <i className="fa-solid fs-4 fa-spinner fa-spin"></i>
                  </button>
                ) : (
                  <button className={`btn ${style.authButton} w-100 mt-3`} type="submit">
                    تسجيل دخول
                  </button>
                )}

                <div className="mt-3 text-center">
                  لا تمتلك حساب ؟{' '}
                  <Link to="/Register" className={style.authLink}>
                    انشئ حسابك
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}