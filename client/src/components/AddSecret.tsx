import { Form, Input, Button, DatePicker } from 'antd';
import { Typography } from 'antd';

const { Title } = Typography;


const AddSecret = () => {
    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
    };
    const config = {
        rules: [{ type: 'object' as const, required: true, message: 'Please select time!' }],
    };
    return (
        <div className='add-secret-container'>
            <div className="add-secret-form">
                <Title level={2}>Add a Secret</Title>
                <Form
                    name="normal_login"
                    className="login-form"
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
                        name="date-time-picker" 
                        label="Expires At"
                        {...config}
                    >
                        <DatePicker 
                            showTime format="YYYY-MM-DD HH:mm:ss" />
                    </Form.Item>


                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default AddSecret