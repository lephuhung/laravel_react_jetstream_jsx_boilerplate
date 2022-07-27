import AppLayout from "@/Layouts/AppLayout";
import React, { useState } from 'react';
import {Table} from 'antd'

const columns = [
    {
      title: 'Tiêu đề',
      dataIndex: 'topic',
      key: 'topic',
    },
    {
      title: 'Ngày đăng',
      dataIndex: 'created_date',
      key: 'created_date',
    },
    {
      title: 'Báo',
      dataIndex: 'newspaper',
      key: 'newspaper',
    },
  ];
  
const Dashboard = ({ datadoc }) => {
    return (
        <AppLayout header={
            <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                Dữ liệu từ các nguồn báo
            </h2>
        }>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg">
                        <Table dataSource={datadoc.data} columns={columns} rowKey='article_id' style={{padding:'10px'}}/>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default Dashboard;
