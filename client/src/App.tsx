import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Layout } from 'antd'

import Secret from './components/secret/Secret'
import AddSecret from './components/secret/AddSecret'
import Navbar from './components/partials/Navbar'
import Foot from './components/partials/Foot'

import ApplicationProvider from './context/ApplicationProvider'

import './App.css'

const { Content } = Layout;


const App: React.FC = () => {
  return (
    <ApplicationProvider>
    <Layout>
      <Navbar />
      <Content className="site-layout">
        <div className="site-layout-background">
          <Routes>
            <Route path="/" element={<Navigate to="/secret" replace />}/>
            <Route path='/secret' >
              <Route index element={<Secret/>}/>
              <Route path=':hash' element={<Secret/>}/>
            </Route>
            <Route path='/add-secret' element={<AddSecret/>}/>
            <Route path="*" element={<Navigate to="/secret" replace />}/>
          </Routes>
        </div>
      </Content>
      <Foot />
    </Layout>
    </ApplicationProvider>
  );
}

export default App;



