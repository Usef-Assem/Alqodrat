import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import style from './Auth.module.css';
import { Helmet } from 'react-helmet';
import toast from 'react-hot-toast';

export default function Register() {
  let navigate = useNavigate();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  

  const fetchData = async (values) => {
    setIsLoading(true);
    console.log(values);
    
    try {
      const response = await axios.post(`https://jihan.org/public/api/register`, values);
      const data = response.data;
      toast.success('تم انشاء الحساب بنجاح');
      console.log(data);
      setIsLoading(false);
      navigate('/Login');
    } catch (error) {
      setIsLoading(false);
      setError(error.response?.data?.data.email || 'Something went wrong');
      toast.error('خطأ في انشاء الحساب');
      console.error('Error fetching data:', error);
    }
  };

  let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
  let validateScheme = yup.object({
    name: yup
      .string()
      .min(3, 'يجب ادخال 3 حروف علي الاقل')
      .max(20, 'الحد الاقصي للاسم 20 حرف')
      .required('هذا الحقل مطلوب'),
    email: yup.string().email('البريد الالكتروني غير صالح').required('هذا الحقل مطلوب'),
    password: yup
      .string()
      .matches(passwordRegex, 'يجب ان تحتوي كلمة السر علي حروف كبيرة و ارقام')
      .required('هذا الحقل مطلوب'),
    password_confirmation: yup
      .string()
      .oneOf([yup.ref('password')], 'كلمة السر غير متطابقة')
      .required('هذا الحقل مطلوب'),
  });

  let formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
    },
    validationSchema: validateScheme,
    onSubmit: (values) => fetchData(values),
  });

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>انشاء الحساب</title>
      </Helmet>

      <div className={style.Register}>
        <div className="d-flex justify-content-center align-items-center min-vh-100">
          <div className="col-md-6 col-lg-5 col-11">
            <div className={`${style.authCard} p-4 p-md-5 rounded-3 shadow`}>
              <h1 className={`text-center ${style.authTitle}`}>انشاء حساب</h1>
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
                    name="name"
                    id="Name"
                    className={`form-control ${style.authInput}`}
                    type="text"
                    placeholder="ادخل اسم المستخدم"
                  />
                  {formik.errors.name && formik.touched.name ? (
                    <div className={`alert ${style.errorAlert} mt-2`}>{formik.errors.name}</div>
                  ) : (
                    ''
                  )}
                </div>

                <div className="mb-3">
                  <input
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="email"
                    id="E-mail"
                    className={`form-control ${style.authInput}`}
                    type="email"
                    placeholder="ادخل البريد الالكتروني"
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

                <div className="mb-3">
                  <input
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="password_confirmation"
                    id="password_confirmation"
                    className={`form-control ${style.authInput}`}
                    type="password"
                    placeholder="ادخل كلمة السر مرة اخري"
                  />
                  {formik.errors.password_confirmation && formik.touched.password_confirmation ? (
                    <div className={`alert ${style.errorAlert} mt-2`}>
                      {formik.errors.password_confirmation}
                    </div>
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
                    انشئ حساب
                  </button>
                )}

                <div className="mt-3 text-center">
                  بالفعل تمتلك حساب ؟{' '}
                  <Link to="/Login" className={style.authLink}>
                    سجل دخول الان
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