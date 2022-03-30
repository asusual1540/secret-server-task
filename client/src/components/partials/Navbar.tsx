import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Layout, Menu } from 'antd'


import { ApplicationContext } from '../../context/ApplicationContext'

import logo from '../../assets/logo.svg'

const { Header } = Layout

const Navbar: React.FC = () => {
  const { applicationState, changeMenu } = useContext(ApplicationContext)

  return (
    <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
      
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
      <Menu theme="dark" mode="horizontal" selectedKeys={[`${applicationState.selectedMenu}`]}>
        <Menu.Item key="reveal-secret">
          <Link to='/secret' onClick={() => changeMenu('reveal-secret')}>Reveal Secret</Link>
        </Menu.Item>
        <Menu.Item key="add-secret">
          <Link to='/add-secret' onClick={() => changeMenu('add-secret')}>Add Secret</Link>
        </Menu.Item>
      </Menu>
    </Header>
  )
}

export default Navbar