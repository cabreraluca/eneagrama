import React from 'react'
import { AdminMenu } from '../components/Admin/AdminMenu';
export function AdminLayout(props) {
    const {children} = props;
  return (
    <div className='admin-Layout'>
      <div className='admin-Layout__left'>
        <div className='admin-Layout__left__logo'>
          
        </div>
        <AdminMenu />
      </div>
      <div className='admin-Layout__right'>
        <div className='admin-Layout__right-header'>
          
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
