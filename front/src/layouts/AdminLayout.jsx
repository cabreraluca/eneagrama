import React from 'react'
import { AdminMenu } from '../components/Admin/AdminMenu';
import { Logout } from '../components/Auth';
export function AdminLayout(props) {
    const {children} = props;
  return (
    <div className='admin-Layout'>
      <div className='admin-Layout__left'>
        <div className='admin-Layout__left__logo'>
            <p>admin panel</p>
        </div>
        <AdminMenu />
      </div>
      <div className='admin-Layout__right'>
        <div className='admin-Layout__right-header'>
            <Logout />
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
