import React from 'react'
export function ClientLayout(props) {
    const {children} = props;
  return (
    <div className='admin-Layout'>
      <div>
        <h2>Logo</h2>
      </div>
      <div className='admin-Layout__right'>
        <div className='admin-Layout__right-header'>
          {/* <Logout /> */}
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
