import React from 'react'
import { Table, Space } from 'antd';

const columns = [
    {
      title: 'Hash',
      dataIndex: 'hash',
      key: 'hash',
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: 'Secret Text',
      dataIndex: 'secretText',
      key: 'secretText'
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: 'Expires At',
      dataIndex: 'expiresAt',
      key: 'expiresAt',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text: string) => (
        <Space size="middle">
          <a>View</a>
        </Space>
      ),
    },
  ];
  
  const data = [
    {
      hash: 'AF43CE',
      secretText: 'My secret text 1',
      createdAt: "31/1/2022 23:45",
      expiresAt: "31/2/2022 23:45",
    },
    {
      hash: 'D2EEA3',
      secretText: 'My secret text 2',
      createdAt: "21/3/2022 20:45",
      expiresAt: "31/4/2022 23:45",
    },
    {
      hash: 'BDCA23',
      secretText: 'My secret text 3',
      createdAt: "11/2/2022 13:45",
      expiresAt: "31/4/2022 23:45",
    },
  ];
  


function SecretList() {
  return (
    <Table columns={columns} dataSource={data} />
  )
}

export default SecretList