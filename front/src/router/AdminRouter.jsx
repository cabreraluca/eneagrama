import React from 'react'
import { Route, Routes } from 'react-router-dom';
import {AdminLayout} from '../layouts'
import { Login } from '../components/Auth';
import {useAuth} from '../hooks';
import { QuestContainer } from '../components/QuestContainer';
import { Users } from '../components/Users/Users';
export function AdminRouter() {
  const {user} = useAuth();
  const loadLayout = (Layout, Page) =>{
    return(
      <Layout>
        <Page />
      </Layout>
    )
  }
  return (
    <Routes>
      {!user?(
        <Route path='/admin/*' element= {<Login />}/>
      ):
        <>
        <Route path='/admin' element={loadLayout(AdminLayout, QuestContainer)}/>
        <Route path='/admin/users' element={loadLayout(AdminLayout, Users)}/>
        </>
      }
    </Routes>
  )
}
