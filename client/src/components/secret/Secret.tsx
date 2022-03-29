import React, { useEffect, useState } from 'react'
import { Form, Input, Button, DatePicker, Typography } from 'antd'
import moment from 'moment';
import { useParams } from 'react-router-dom'
import { SmileOutlined, FrownOutlined } from '@ant-design/icons';


import * as secretService from './SecretService'
import { openNotification } from '../utils/Notification'



const { Title } = Typography



const Secret = () => {
  const [hasValidHash, setHasValidHash] = useState(false)
  const [secret, setSecret] = useState({ hash: '', secretText : '', createdAt: '', expireAt : ''})
  const [form] = Form.useForm();
  const { hash } = useParams()


  const loadSecret = async (hash: string) => {
    try {
      const response = await secretService.getSecret(hash)
      console.log(response)
      if (response.data.status === 'success') {
        const secret = response.data.data
        openNotification('Success', 'Secret was decoded from the hash.', <SmileOutlined style={{ color: '#108ee9' }} />)
        setSecret(secret)
        setHasValidHash(true)
        form.setFieldsValue({
          secretText: secret.secretText, 
          createdAt : moment(secret.createdAt, "YYYY-MM-DD HH:mm:ss"),
          expireAt : moment(secret.expireAt, "YYYY-MM-DD HH:mm:ss")
        });
      } else {
        const err_res = response.data
        openNotification(err_res.status.capitalize(), err_res.message, <FrownOutlined style={{ color: '#ff2800' }} />)
        form.setFieldsValue({
          secretText: '', 
          createdAt : '',
          expireAt : ''
        });
      }
    } catch (err) {
      openNotification('Sorry', 'Secret was not found!', <FrownOutlined style={{ color: '#ff2800' }} />)
      form.setFieldsValue({
        secretText: '', 
        createdAt : '',
        expireAt : ''
      });
    }
    
  }
  useEffect(() => {
    if (hash) {
      loadSecret(hash)
    }
  }, [])

  const onFinishSearching = async (values: any) => {
    console.log(values.hash)
    await loadSecret(values.hash)
  };


  return (
    <div className='add-secret-container'>
      <div className="add-secret-form">
        <Title level={2}>Reveal Secret</Title>
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
        {hasValidHash ?
          <div>

            <Form
              name="search_secret"
              className="search-secret"
              layout="vertical"
              form={form}
              initialValues={{ 
                secretText: secret.secretText, 
                createdAt : moment(secret.createdAt, "YYYY-MM-DD HH:mm:ss"),
                expireAt : moment(secret.expireAt, "YYYY-MM-DD HH:mm:ss")
              }}
            >

              <Title level={2}>Your Secret</Title>


              <Form.Item
                name="secretText"
                label="Secret Text"
              >
                <Input
                  placeholder="Type Hash" readOnly={true}
                />
              </Form.Item>
              <Form.Item
                name="createdAt"
                label="Created At"
              >
                <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" disabled={true}/>
                </Form.Item>
              <Form.Item
                name="expireAt"
                label="Expire At"
              >
                <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" disabled={true}/>
              </Form.Item>
            </Form>
          </div>
          :
          <div>

          </div>
        }
      </div>

    </div>
  )
}

export default Secret