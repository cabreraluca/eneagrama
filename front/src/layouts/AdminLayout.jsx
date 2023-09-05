import React from 'react'
import { AdminMenu } from '../components/Admin/AdminMenu';
import { Logout } from '../components/Auth';

export const AdminLayout = (props) => {
    const {children} = props;
  return (
    <section className='admin-Layout'>
      <div className='admin-Layout__left'>
        <AdminMenu />
        <Logout/>
      </div>
      <main className='admin-Layout__right'>
            {children}
      </main>
    </section> 
    
  )
}
