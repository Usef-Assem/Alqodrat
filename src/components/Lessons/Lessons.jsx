import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import GoogleDrive from '../../Assets/Google Drive.jpg';
import YouTube from '../../Assets/Youtube.jpg';
import GoogleForm from '../../Assets/Quiz.jpg';
import { Helmet } from 'react-helmet';
import style from './Lessons.module.css';

function Lessons() {
  const navigate = useNavigate();
  const [subjectData, setSubjectData] = useState({
    name: '',
    googleDriveUrls: [],
    youtubeUrls: [],
    googleFormUrls: [],
  });

  useEffect(() => {
    const requestBody = {
      subject_id: 1,
    };

    const fetchData = async () => {
      try {
        const response = await axios.post(
          'https://jihan.org/public/api/students/request-subject',
          requestBody,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('Token')}`,
            },
          }
        );

        console.log('Success:', response.data);

        if (response.data.message === 'تم قبول طلبك لهذه المادة') {
          const { name, drive_url, youtube_url, google_form_url } = response.data.subject;

          setSubjectData({
            name,
            googleDriveUrls: drive_url ?? [], // Fallback to empty array if null
            youtubeUrls: youtube_url ?? [], // Fallback to empty array if null
            googleFormUrls: google_form_url ?? [], // Fallback to empty array if null
          });
        } else if (response.data.message === 'طلبك قيد المعالجة') {
          Swal.fire({
            icon: 'info',
            title: 'طلبك قيد المعالجة',
            text: 'يرجى الانتظار حتى يتم معالجة طلبك.',
            confirmButtonText: 'حسناً',
          }).then(() => {
            navigate('/');
          });
        } else {
          Swal.fire({
            icon: 'warning',
            title: 'يجب عليك الدفع أولاً',
            text: 'يرجى إكمال عملية الدفع للمتابعة.',
            confirmButtonText: 'حسناً',
          }).then(() => {
            navigate('/');
          });
        }
      } catch (error) {
        console.error('Error:', error);
        Swal.fire({
          icon: 'error',
          title: 'حدث خطأ أثناء معالجة طلبك',
          text: 'يرجى المحاولة مرة أخرى لاحقاً.',
          confirmButtonText: 'حسناً',
        }).then(() => {
          navigate('/');
        });
      }
    };

    fetchData();
  }, [navigate]);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>ا/ جيهان عبد الغفور</title>
      </Helmet>
      <div className="lessons-container py-4">
        {subjectData.name && (
          <div className="subject-container">
            <h2 className={`${style.title} text-center py-3`}>{subjectData.name}</h2>

            {/* YouTube Section */}
            <div dir='rtl' className="mb-5">
              <h3 className={`${style.sectionTitle} text-center mb-4`}>حصص اليوتيوب</h3>
              {subjectData.youtubeUrls.length > 0 ? (
                <div className="d-flex flex-wrap justify-content-center gap-4">
                  {subjectData.youtubeUrls.map((video, index) => (
                    <div key={index} className="card py-3" style={{ width: '18rem' }}>
                      {/* <img src={YouTube} className="card-img-top" alt="YouTube" /> */}
                      <div className="card-body">
                        <h5 className="card-title text-center">{video.description}</h5>
                        <a href={video.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary w-100 mt-5">
                          شاهد الحصة
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="fs-4 alert alert-danger w-50 d-flex mx-auto justify-content-center align-items-center">
                لا يوجد حصص للمشاهدة
              </p>
              )}
            </div>

            {/* Google Drive Section */}
            <div dir='rtl' className="mb-5">
              <h3 className={`${style.sectionTitle} text-center mb-4`}>الملازم</h3>
              {subjectData.googleDriveUrls.length > 0 ? (
                <div className="d-flex flex-wrap justify-content-center gap-4">
                  {subjectData.googleDriveUrls.map((drive, index) => (
                    <div key={index} className="card py-3" style={{ width: '18rem' }}>
                      {/* <img src={GoogleDrive} className="card-img-top" alt="Google Drive" /> */}
                      <div className="card-body">
                        <h5 className="card-title text-center">{drive.description}</h5>
                        <a href={drive.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary w-100 mt-5">
                          عرض الملزمة
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="fs-4 alert alert-danger w-50 d-flex mx-auto justify-content-center align-items-center">
                لا يوجد ملازم
              </p>
              )}
            </div>

            {/* Google Form Section */}
            <div dir='rtl' className="mb-5">
              <h3 className={`${style.sectionTitle} text-center mb-4`}>الامتحانات</h3>
              {subjectData.googleFormUrls.length > 0 ? (
                <div className="d-flex flex-wrap justify-content-center gap-4">
                  {subjectData.googleFormUrls.map((form, index) => (
                    <div key={index} className="card py-3" style={{ width: '18rem' }}>
                      {/* <img src={GoogleForm} className="card-img-top" alt="Google Form" /> */}
                      <div className="card-body">
                        <h5 className="card-title text-center">{form.description}</h5>
                        <a href={form.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary w-100 mt-5">
                          ابدأ الامتحان
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
              <p className="fs-4 alert alert-danger w-50 d-flex mx-auto justify-content-center align-items-center">
                لا يوجد امتحانات
              </p>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Lessons;