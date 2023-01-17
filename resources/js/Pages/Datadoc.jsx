import AppLayout from "@/Layouts/AppLayout";
import React, { useState, useRef, useEffect } from "react";
import {
    Table,
    Input,
    Button,
    AutoComplete,
    Select,
    Typography,
    Col,
    Row,
    message,
    Space,
    Tag
} from "antd";
import axios from "axios";
import { Link } from '@inertiajs/inertia-react'
const tags = ["thông tin", "giải trí", "thời sự", "thời tiết", "sự kiện"];
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
        render: (text) => {
            let color = text.length > 5 ? 'geekblue' : 'green';
            return (
                <Tag color={color} >
                    {text.toUpperCase()}
                </Tag>
            )
        }
    },
    {
        title: "Chỉ mục/Tag",
        key: "tag",
        render: (_, record, tags) => (
            <>
                {["thông tin", "giải trí", "thời sự", "thời tiết", "sự kiện"].map(tag => {
                    let color = tag.length > 8 ? 'geekblue' : 'green';
                    if (tag === 'giải trí') {
                        color = 'volcano';
                    }
                    return (
                        <Tag color={color} key={tag}>
                            {tag}
                        </Tag>
                    )
                })}
            </>
        )

    }
];

const Dashboard = ({ datadoc }) => {
    const timeoutRef = useRef(null);
    const { Option } = Select;
    const { Text, Title } = Typography;
    const [options, setOptions] = useState([]);
    const [postsearch, setpostsearch] = useState("");
    const [search, setsearch] = useState([]);
    const [fetchdata, setfetchdata] = useState({
        loading: false,
        data: [],
        total: 0
    });
    async function onSearch(value) {
        setsearch([]);
        await axios
            .post("/api/search", { search: value })
            .then((res) => {
                setsearch(res.data.data.documents);
                //thay thế hiện thị kết quả vào table
                message.info(`Kết quả tìm kiếm trong ${res.data.data.took || 0} s`);
            })
            .catch((err) => {
                message.error('Không kết nối được máy chủ Elastic');
            });
        ;
    }

    function fetchdatarequest(current, pageSize, total) {
        if (current * pageSize < total + pageSize) {
            setfetchdata({ ...fetchdata, loading: true });
            axios.get(`http://localhost/api/datadocquery?page=${current}`).then((res) => {
                setfetchdata({ ...fetchdata, data: res.data.data.data, loading: false });

            }).catch(err => console.log(err));
        }
    }
    useEffect(() => {
        timeoutRef.current = setTimeout(() => {
            timeoutRef.current = null;
            postsearch !== "" ? onSearch(postsearch) : setsearch([]);
        }, 500);
        return () => {
            clearTimeout(timeoutRef.current); // clear timeout
        };
    }, [postsearch]);
    useEffect(() => {
        setfetchdata({ ...fetchdata, loading: true });
        axios.get('http://localhost/api/datadocquery?page=1').then((res) => {
            setfetchdata({ data: res.data.data.data, loading: false, total: res.data.data.total });
        }).catch(err => console.log(err));
    }, []);
    return (
        <AppLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dữ liệu từ các nguồn báo
                </h2>
            }
        >
            <div className="py-12" >
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg">
                        <Row padding={5} style={{ paddingTop: '20px' }}>
                            <Col
                                span={12}
                                offset={8}
                                style={{ display: "flex", justify: "center" }}
                            >

                                <AutoComplete
                                    value={postsearch}
                                    style={{ width: 400 }}
                                    placeholder="Nhâp từ khoá cần tìm kiếm"
                                    onChange={(e) => setpostsearch(e)}
                                    allowClear={true}
                                >
                                    {search.map((item, index) => {
                                        return (
                                            <Option key={index} value={postsearch}>
                                                <Link href={item._source.href} target="_blank" rel="noopener noreferrer" key={index}>{item._source.topic}</Link>
                                            </Option>

                                        );
                                    })}
                                </AutoComplete>
                            </Col>
                        </Row>
                        <div style={{ padding: '10px' }} >
                            <Space style={{ marginBottom: 16 }}> <Title strong level={4}>Danh sách bài viết gần đây</Title></Space>
                            <Table
                                dataSource={fetchdata.data}
                                columns={columns}
                                rowKey="article_id"
                                bordered
                                pagination={{ pageSize: 15, total: fetchdata.total, itemRender: (current, type, originalElement) => { if (type == 'page') {return <Link href={`?page=${current}`}>{current}</Link>} else return originalElement } }}
                                onChange={({ current, pageSize, total }) => fetchdatarequest(current, pageSize, total)}
                                loading={fetchdata.loading}
                            />

                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};


export default Dashboard;
