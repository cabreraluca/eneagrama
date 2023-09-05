import React from 'react';
import {Route, Routes} from 'react-router-dom';
import { ClientLayout } from '../layouts';
import { AuthComponent } from '../pages/admin/Auth';
import { useAuth } from '../hooks';
import { QuestContainer } from '../components/QuestContainer';
import { UserResults } from '../components/Users/UserResults';
import { Home } from '../components/Home/Home';
import { Login, RegisterForm } from '../components/Auth';
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
        <Route path='/*' element= {<Login/>}/>
      ):
        <>
        <Route path='/' element={loadLayout(ClientLayout, Home)}/>
        <Route path='/cuestionario' element={loadLayout(ClientLayout, QuestContainer)}/>
        <Route path='/user/:id' element={loadLayout(ClientLayout, UserResults)} />
        </>
      }
    </Routes>
  )
}