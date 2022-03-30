import React, { useContext, useEffect, useState } from 'react'
import moment from 'moment';
import { Form, Input, Typography } from 'antd'
import { CopyOutlined, SmileOutlined } from '@ant-design/icons';


import { CopyToClipboard } from '../utils/CopyToClipBoard';
import { ApplicationContext } from '../../context/ApplicationContext';
import { openNotification } from '../utils/Notification'

const { Title } = Typography

const SingleSecret: React.FC = () => {
    const [form] = Form.useForm()
    const [hasSecret, setHasSecret] = useState(false)
    const { applicationState } = useContext(ApplicationContext)
    const copyToClipBoard = (text:string) => {
        CopyToClipboard(text)
        openNotification('bottom', 'Success', 'The hash was copied to clipboard.', <SmileOutlined style={{ color: '#108ee9' }} />)
    }
    useEffect(() => {
        if (!applicationState.secret.secretText.length) setHasSecret(false)
        else setHasSecret(true)
        const creation = applicationState.secret.createdAt.length ? `${moment(applicationState.secret.createdAt, "YYYY-MM-DD HH:mm:ss")}` : ''
        const expiration = applicationState.secret.expireAt.length ? `${moment(applicationState.secret.expireAt, "YYYY-MM-DD HH:mm:ss")}` : ''
        form.setFieldsValue({
            hash: applicationState.secret.hash,
            secretText: applicationState.secret.secretText,
            createdAt: creation,
            expireAt: expiration
        });
    }, [applicationState, form])

    return (
        <div>
            {hasSecret ? <Form
                name="search_secret"
                form={form}
                className="search-secret"
                layout="vertical"
                initialValues={{
                    secretText: applicationState.secret.secretText,
                    hash: applicationState.secret.hash,
                    createdAt: `${moment(applicationState.secret.createdAt, "YYYY-MM-DD HH:mm:ss")}`,
                    expireAt: `${moment(applicationState.secret.expireAt, "YYYY-MM-DD HH:mm:ss")}`
                }}
            >
                <Title level={4}>Your Secret</Title>
                <Form.Item
                    name="secretText"
                    label="Secret Text"
                >
                    <Input.TextArea readOnly={true} showCount maxLength={100} />
                </Form.Item>
                <Form.Item
                    name="hash"
                    label="Hash"
                >
                    <Input readOnly={true} addonAfter={<CopyOutlined onClick={() => copyToClipBoard(applicationState.secret.hash)}/>} />
                </Form.Item>
                <Form.Item
                    name="createdAt"
                    label="Created At"
                >
                    <Input readOnly={true} />
                </Form.Item>
                <Form.Item
                    name="expireAt"
                    label="Expire At"
                >
                    <Input readOnly={true} />
                </Form.Item>
            </Form>
            : <div></div>}
            
        </div>
    )
}

export default SingleSecret