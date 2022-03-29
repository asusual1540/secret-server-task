import React, { useState } from 'react';
import moment from 'moment';
import { Form, Input, Button, DatePicker, Typography } from 'antd';
import { SmileOutlined, FrownOutlined } from '@ant-design/icons';

import * as secretService from './SecretService'
import { openNotification } from '../utils/Notification'

const { Title } = Typography;


const AddSecret = () => {
    const [form] = Form.useForm();
    const [hasSecret, setHasSecret] = useState(false)
    const [secret, setSecret] = useState({
        createdAt: "",
        expireAt: "",
        hash: "",
        secretText: ""
    })

    const onFinish = async (values: any) => {
        const secret = {
            secretText: values.secretText,
            expireAt: values['expireAt'].toISOString()
        }
        try {
            const response = await secretService.addSecret(secret)
            if (response.data.status === 'success') {
                const returned_secret = response.data.data
                openNotification('Success', 'Secret added successfully.', <SmileOutlined style={{ color: '#108ee9' }} />)
                setSecret(returned_secret)
                setHasSecret(true)
                form.setFieldsValue({
                    hash: returned_secret.hash,
                    secretText: returned_secret.secretText,
                    createdAt: moment(returned_secret.createdAt, "YYYY-MM-DD HH:mm:ss"),
                    expireAt: moment(returned_secret.expireAt, "YYYY-MM-DD HH:mm:ss")
                });
            } else {
                const err_res = response.data
                openNotification(err_res.status, err_res.message, <FrownOutlined style={{ color: '#ff2800' }} />)
            }
            

        } catch (err) {
            openNotification('Sorry', 'Secret can not be added at this time!', <FrownOutlined style={{ color: '#ff2800' }} />)
            setSecret({
                createdAt: "",
                expireAt: "",
                hash: "",
                secretText: ""
            })
            setHasSecret(false)
            form.setFieldsValue({
                hash: '',
                secretText: '',
                createdAt: moment('', "YYYY-MM-DD HH:mm:ss"),
                expireAt: moment('', "YYYY-MM-DD HH:mm:ss")
            });
            console.log(err)
        }

    };
    const config = {
        rules: [{ type: 'object' as const, required: true, message: 'Please select time!' }],
    };
    return (
        <div className='add-secret-container'>
            <div className="add-secret-form">
                <Title level={2}>Add Secret</Title>
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
                        <Input
                            placeholder="Type Secret"
                        />
                    </Form.Item>

                    <Form.Item
                        name="expireAt"
                        label="Expires At"
                        {...config}
                    >
                        <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
                    </Form.Item>


                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
                {hasSecret ?
                    <div>
                        <Form
                            name="search_secret"
                            className="search-secret"
                            layout="vertical"
                            form={form}
                            initialValues={{
                                hash: secret.hash,
                                secretText: secret.secretText,
                                createdAt: moment(secret.createdAt, "YYYY-MM-DD HH:mm:ss"),
                                expireAt: moment(secret.expireAt, "YYYY-MM-DD HH:mm:ss")
                            }}
                        >

                            <Title level={2}>Your Secret</Title>
                            <Form.Item
                                name="hash"
                                label="Secret Hash"
                            >
                                <Input
                                    placeholder="Type Hash" readOnly={true}
                                />
                            </Form.Item>

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
                                <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" disabled={true} />
                            </Form.Item>
                            <Form.Item
                                name="expireAt"
                                label="Expire At"
                            >
                                <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" disabled={true} />
                            </Form.Item>
                        </Form>
                    </div>
                    :
                    <div>

                    </div>
                }

            </div>
        </div>
    );
};

export default AddSecret