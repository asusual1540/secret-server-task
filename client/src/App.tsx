import React, { useEffect, useState } from 'react'
import { Routes, Route, Link, useLocation, Navigate } from 'react-router-dom'
import { Layout, Menu, Breadcrumb } from 'antd';
import Secret from './components/secret/Secret'
import AddSecret from './components/secret/AddSecret'

import './App.css';
import logo from './assets/logo.svg';
const { Header, Content, Footer } = Layout;



function App () {
  const [selectedMenu, setSelectedMenu] = useState(['add-secret'])

  let location = useLocation();
  
  useEffect(() => {
    console.log("location", location.pathname)
    if (location.pathname === '/') setSelectedMenu(['add-secret'])
    else if (location.pathname.includes('secret')) setSelectedMenu(['reveal-secret'])
  }, [])

  return (
    <Layout>
      <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>
        <Menu theme="dark" mode="horizontal" selectedKeys={selectedMenu}>
          <Menu.Item key="add-secret"><Link to='/' onClick={() => setSelectedMenu(['add-secret'])}>Add Secret</Link></Menu.Item>
          <Menu.Item key="reveal-secret"><Link to='/secret' onClick={() => setSelectedMenu(['reveal-secret'])}>Reveal Secret</Link></Menu.Item>
        </Menu>
      </Header>
      <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
        
        <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
          <Routes>
            <Route path='/' element={<AddSecret/>}/>
            <Route path='secret' >
              <Route index element={<Secret/>}/>
              <Route path=':hash' element={<Secret/>}/>
            </Route>
            <Route
                path="*"
                element={<Navigate to="/" replace />}
            />
          </Routes>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Asusual ©2022 Created by Mehe D Adnan</Footer>
    </Layout>
  );
}

export default App;



