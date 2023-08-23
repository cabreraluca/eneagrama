import React from 'react'
export function ClientLayout(props) {
    const {children} = props;
  return (
    <div className='admin-Layout'>
      <div className='admin-Layout__left'>
        <div className='admin-Layout__left__logo'>
          <span>logo</span>
        </div>

      </div>
      <div className='admin-Layout__right'>
        <div className='admin-Layout__right-header'>
          {/* <Logout /> */}
          <p>hola</p>
        </div>
        <div>
          <div className='admin-Layout__right-content'>
            {children}
          </div>
        </div>
      </div>
    </div> 
    
  )
}
