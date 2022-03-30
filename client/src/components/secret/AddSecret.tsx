import React, { useState, useContext } from 'react';
import { Form, Input, Button, DatePicker, Typography, Spin } from 'antd';
import { SmileOutlined, FrownOutlined } from '@ant-design/icons';

import * as secretService from './SecretService'
import { openNotification } from '../utils/Notification'
import { ApplicationContext } from '../../context/ApplicationContext'
import SingleSecret from './SingleSecret';

const { Title } = Typography;


const AddSecret: React.FC = () => {
    const { setSecret } = useContext(ApplicationContext)

    const [hasSecret, setHasSecret] = useState(false)
    const [loading, setLoading] = useState(false)

    const onFinish = async (values: any) => {
        setLoading(true)
        const secret = {
            secretText: values.secretText,
            expireAt: values['expireAt'].toISOString()
        }
        try {
            const response = await secretService.addSecret(secret)
            setLoading(false)
            if (response.data.status === 'success') {
                const returned_secret = response.data.data
                openNotification('bottom', 'Success', 'Secret added successfully.', <SmileOutlined style={{ color: '#108ee9' }} />)
                setSecret(returned_secret)
                setHasSecret(true)
            } else {
                const err_res = response.data
                openNotification('bottom', err_res.status, err_res.message, <FrownOutlined style={{ color: '#ff2800' }} />)
            }
        } catch (err) {
            setLoading(false)
            openNotification('bottom', 'Sorry', 'Secret can not be added at this time!', <FrownOutlined style={{ color: '#ff2800' }} />)
            setHasSecret(false)
        }
    }
    const config = {
        rules: [{ type: 'object' as const, required: true, message: 'Please select date time!' }],
    }
    return (
        <div className='add-secret-container'>
            <div className="add-secret-form">
                <Title level={4}>Add Secret</Title>
                <Form
                    name="add_secret"
                    className="add-secret"
                    layout="vertical"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="secretText"
                        label="Secret text"
                        rules={[{ required: true, message: 'Please type your Secret!' }]}
                    >
                        <Input.TextArea
                            placeholder="Type Secret" showCount maxLength={100} allowClear={true}
                        />
                    </Form.Item>
                    <Form.Item
                        name="expireAt"
                        label="Expires At"
                        {...config}
                    >
                        <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" dropdownClassName='secret-date-time-picker' />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
                { loading ? <Spin tip="Loading..."> </Spin> : <div> </div> }
                { hasSecret ? <SingleSecret /> : <div> </div> }
            </div>
        </div>
    );
};

export default AddSecret