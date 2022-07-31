import AppLayout from "@/Layouts/AppLayout";
import React, { useState } from "react";
import { Table, Input, Button, AutoComplete, Select, Typography, Col, Row } from "antd";
import axios from "axios";

const columns = [
    {
        title: "Tiêu đề",
        dataIndex: "topic",
        key: "topic",
    },
    {
        title: "Ngày đăng",
        dataIndex: "created_date",
        key: "created_date",
    },
    {
        title: "Báo",
        dataIndex: "newspaper",
        key: "newspaper",
    },
];

const Dashboard = ({ datadoc }) => {
    const { Option } = Select;
    const { Text, Link } = Typography;
    const [options, setOptions] = useState([]);
    const [datasearch, setdatasearch] = useState('ß');
    const [search, setsearch] = useState([]);
    const [time, settime] = useState(0);
    async function onSearch() {
        await axios
            .post("/api/search", { search: datasearch })
            .then((res) => {
                settime(res.data.took);
                setsearch(res.data.documents);
            })
            .catch((err) => {});
        ß;
    }
    function OptionView() {
        return search.map((item) => {
            return <Option key={item}>{item}</Option>;
        });
    }
    const handleSearch = (value) => {
        setdatasearch(value);
        onSearch();
    };

    const onSelect = (value) => {
        console.log("onSelect", value);
    };

    return (
        <AppLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dữ liệu từ các nguồn báo
                </h2>
            }
        >
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg">
                    <Row padding={5}>
                    <Col
                        span={12}
                        offset={3}
                        style={{ display: "flex", justify: "center" }}
                    >
                        <AutoComplete
                            style={{ width: 400 }}
                            placeholder="Nhâp thông tin khách hàng"
                            onSearch={(value)=>setdatasearch(value)}
                        >
                            {search.map((item, index) => {
                                return (
                                    <Option key={index}>
                                        {/* <Link
                                            href={`/khach-hang/${item.id}`}
                                        >{`${item.} ${item.sdt}`}</Link> */}
                                    </Option>
                                );
                            })}
                        </AutoComplete>
                        </Col>
                        </Row>
                        <br />
                        <Table
                            dataSource={datadoc.data}
                            columns={columns}
                            rowKey="article_id"
                            style={{ padding: "10px" }}
                        />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default Dashboard;
