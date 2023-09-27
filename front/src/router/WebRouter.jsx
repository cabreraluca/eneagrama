import React from 'react';
import {Route, Routes} from 'react-router-dom';
import { AdminLayout, ClientLayout } from '../layouts';
import { useAuth } from '../hooks';
import { ResetPassword, ChangePassword } from '../components/Auth';
import { QuestContainer } from '../components/QuestContainer';
import { UserResults } from '../components/Users/UserResults';
import { Home } from '../components/Home/Home';
import { Login, RegisterForm } from '../components/Auth';
import { UserInfo } from '../components/User/UserInfo';
import { ClientInfo } from '../components/User/ClientInfo';
export function WebRouter() {
  const {user} = useAuth()
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
        <>
        <Route path='/*' element= {<Login/>}/>
        <Route path='/reset-password' element={<ResetPassword />}/>
        <Route path='/register' element= {<RegisterForm/>}/>
        <Route path='/reset-password/:token' element={<ChangePassword />} />
        <Route path='/register' element= {<RegisterForm />}/>
        </>
      ):
        <>
        <Route path='/' element={loadLayout(ClientLayout, Home)}/>
        <Route path='/home' element={loadLayout(ClientLayout, Home)}/>
        <Route path='/cuestionario' element={loadLayout(ClientLayout, QuestContainer)}/>
        <Route path='/reset-password' element={<ResetPassword user={user}/>}/>
        <Route path='/reset-password/:token' element={<ChangePassword />} />
        <Route path='/user/:id' element={loadLayout(ClientLayout, ClientInfo)} />
        <Route path='/user/result/:id' element={loadLayout(ClientLayout, UserResults)} />
        <Route path='/admin/user/:id' element={loadLayout(AdminLayout, UserInfo)} />
        </>
      }
    </Routes>
  )
}