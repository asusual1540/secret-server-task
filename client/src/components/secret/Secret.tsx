import React, { useContext, useEffect, useState } from 'react'
import { Form, Input, Button, Typography, Spin } from 'antd'
import { useParams } from 'react-router-dom'
import {AxiosError} from 'axios'
import { SmileOutlined, FrownOutlined } from '@ant-design/icons';


import * as secretService from './SecretService'
import { openNotification } from '../utils/Notification'
import { ApplicationContext } from '../../context/ApplicationContext';
import SingleSecret from './SingleSecret';


const { Title } = Typography


const Secret: React.FC = () => {
  const { setSecret } = useContext(ApplicationContext)
  const [hasValidHash, setHasValidHash] = useState(false)
  const [loading, setLoading] = useState(false)
  
  const { hash } = useParams()

  const loadSecret = async (hash: string) => {
    try {
      setLoading(true)
      const response = await secretService.getSecret(hash)
      setLoading(false)
      if (response.data.status === 'success') {
        const secret = response.data.data
        openNotification('bottom', 'Success', 'Secret was revealed from the hash.', <SmileOutlined style={{ color: '#108ee9' }} />)
        setSecret(secret)
        setHasValidHash(true)
      } else if (response.data.status === 'failed') {
        const err_res = response.data
        openNotification('bottom', err_res.status.capitalize(), err_res.message, <FrownOutlined style={{ color: '#ff2800' }} />)
      }
    } catch (error) {
      setLoading(false)
      const err = error as AxiosError
      if (err.response) openNotification('bottom', 'Sorry', err.response.data.message, <FrownOutlined style={{ color: '#ff2800' }} />)
      else openNotification('bottom', 'Sorry', 'Secret can not be revealed!', <FrownOutlined style={{ color: '#ff2800' }} />)
    }
  }

  useEffect(() => {
    if (hash) {
      loadSecret(hash)
    }
  }, [hash])

  const onFinishSearching = async (values: any) => {
    await loadSecret(values.hash)
  };


  return (
    <div className='add-secret-container'>
      <div className="add-secret-form">
        <Title level={4}>Reveal Secret</Title>
        <Form
          name="search_secret"
          className="search-secret"
          layout="vertical"
          initialValues={{ hash: hash }}
          onFinish={onFinishSearching}
        >
          <Form.Item
            name="hash"
            label="Hash"
            rules={[{ required: true, message: 'Please type your Hash!' }]}
          >
            <Input
              placeholder="Type Hash" allowClear={true}
            />
          </Form.Item>


          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Reveal
            </Button>
          </Form.Item>
        </Form>
        { loading ? <Spin tip="Revealing..."> </Spin> : <div> </div> }
        { hasValidHash ? <SingleSecret /> : <div></div> }
      </div>

    </div>
  )
}

export default Secret