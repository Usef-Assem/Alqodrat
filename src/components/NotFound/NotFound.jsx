import React from 'react'
import Notfound from '../../Assets/NotFound.svg'
function NotFound() {
  return (
    <div className='d-flex justify-content-center align-items-center py-5'>   
        <img src={Notfound} className='' alt="Notfound image" />
    </div>
  )
}

export default NotFound
