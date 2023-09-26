import React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { AdminLayout } from '../layouts';
import { Login } from '../components/Auth';
import { useAuth } from '../hooks';
import { QuestContainer } from '../components/QuestContainer';
import { Users } from '../components/Users/Users';

export function AdminRouter() {
  const { user } = useAuth();
  const navigate = useNavigate()

  const isAdmin = user && user.role === 'admin' || "company";

  if (!user) {
    return (
      <Routes>
        <Route path="/admin/*" />
      </Routes>
    );
  }

  return (
    <Routes>
      {isAdmin ? (
        <>
          <Route path="/admin" element={loadLayout(AdminLayout, Users)} />
          <Route path="/admin/users" element={loadLayout(AdminLayout, Users)} />
        </>
      ) : (
        <Route path="/admin/*" element={<div>Acceso denegado <button onClick={()=> navigate("/")}>Ir al inicio</button> </div>} />
      )}
    </Routes>
  );
}

function loadLayout(Layout, Page) {
  return (
    <Layout>
      <Page />
    </Layout>
  );
}