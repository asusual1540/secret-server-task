import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import SecretList from './components/SecretList'
import Secret from './components/Secret'
import AddSecret from './components/AddSecret'
import { Layout, Menu, Breadcrumb } from 'antd';

import './App.css';
import logo from './assets/logo.svg';
const { Header, Content, Footer } = Layout;


function App () {
  return (
    <Layout>
      <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
          <Menu.Item key="1"><Link to='/'>Secret List</Link></Menu.Item>
          <Menu.Item key="2"><Link to='/add-secret'>Add Secret</Link></Menu.Item>
        </Menu>
      </Header>
      <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
        
        <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
          <Routes>
            <Route path='/' element={<SecretList/>}/>
            <Route path='/add-secret' element={<AddSecret/>}/>
            <Route path='/secret' element={<SecretList/>}/>
            <Route path='/secret/:hash' element={<Secret/>}/>
          </Routes>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Asusual ©2022 Created by Mehe D Adnan</Footer>
    </Layout>
  );
}

export default App;



