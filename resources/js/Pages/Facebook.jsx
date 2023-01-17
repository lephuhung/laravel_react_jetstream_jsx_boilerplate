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
    Space
} from "antd";
const Facebook = ( ) => {
    const { Text, Title } =  Typography;
    const { Option } = Select;
    const [postsearch, setpostsearch] = useState("");
    const timeoutRef = useRef(null);
    const [search, setsearch] = useState([]);
    const columns = [
        {
            title: "ID POST",
            dataIndex: "id_fb_post",
            key: "id_fb_post",
        },
        {
            title: "Ngày đăng",
            dataIndex: "publish_time",
            key: "publish_time",
        },
        {
            title: "Nội dung bài viết",
            dataIndex: "content",
            key: "content",
        },
    ];
    async function onSearch(value) {
        setsearch([]);
        await axios
            .post("/api/searchfb", { search: value })
            .then((res) => {
                setsearch(res.data.data.documents);
                console.log(res.data);
                message.info(`Kết quả tìm kiếm trong ${res.data.data.took || 0} s`);
            })
            .catch((err) => {
                message.error('Không kết nối được máy chủ Elastic');
             });
        ;
    }
    useEffect(() => {
        timeoutRef.current = setTimeout(() => {
            timeoutRef.current = null;
            postsearch ? onSearch(postsearch) : setsearch([]);
        }, 500);
        return () => {
            clearTimeout(timeoutRef.current);
        };
    }, [postsearch]);
    return (
        <AppLayout header={
            <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                Dữ liệu Facebook
            </h2>
        }>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg">
                        <Row padding={5} style={{ paddingTop: '30px' }}>
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
                                >
                                    {search?.map((item, index) => {
                                        return (
                                            <Option key={index} value={postsearch}>
                                                <Text>{item._source.content}</Text>
                                            </Option>
                                        );
                                    })}
                                </AutoComplete>
                            </Col>

                        </Row>
                        <div style={{ padding: '10px' }} >
                            <Space style={{ marginBottom: 16 }}>
                                <Title strong level={4}>Danh sách bài viết gần đây</Title>
                            </Space>
                            {/* <Table
                                columns={columns}
                                dataSource={post.data}
                                rowkey='id_fb_post'
                                bordered
                            /> */}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default Facebook;
