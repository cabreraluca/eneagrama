import React from 'react';
import {Route, Routes} from 'react-router-dom';
import { ClientLayout } from '../layouts';
import { Auth } from '../pages/admin/Auth';
import { useAuth } from '../hooks';
import { QuestContainer } from '../components/QuestContainer';
import { Users } from '../components/Users/Users';
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
        <Route path='/*' element= {<Auth />}/>
      ):
        <>
        <Route path='/' element={loadLayout(ClientLayout, QuestContainer)}/>
        {/* <Route path='/user' element={loadLayout(ClientLayout, Users)} /> */}
        </>
      }
    </Routes>
  )
}