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
    message
} from "antd";
import axios from "axios";
import { UserAddOutlined } from "@ant-design/icons";
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
    const timeoutRef = useRef(null);
    const { Option } = Select;
    const { Text, Link } = Typography;
    const [options, setOptions] = useState([]);
    const [postsearch, setpostsearch] = useState("");
    const [search, setsearch] = useState([]);
    const [time, settime] = useState(0);
    async function onSearch(value) {
        setsearch([]);
        await axios
            .post("/api/search", { search: value})
            .then((res) => {
                setsearch(res.data.data.documents);
                console.log(res.data)
                message.info(`Kết quả tìm kiếm trong ${res.data.data.took} s`);
            })
            .catch((err) => {});
        ;
    }

    const onSelect = (value) => {
        console.log("onSelect", value);
    };
    useEffect(() => {
        timeoutRef.current = setTimeout(() => {
            timeoutRef.current = null;
            postsearch !== "" ? onSearch(postsearch) : setsearch([]);
        }, 500);
        return () => {
            clearTimeout(timeoutRef.current); // clear timeout
        };
    }, [postsearch]);
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
                                    value={postsearch}
                                    style={{ width: 400 }}
                                    placeholder="Nhâp thông tin khách hàng"
                                    onChange={(e) => setpostsearch(e)}
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
                            {/* <Col span={6} offset={3}>
                                <Button
                                    type="primary"
                                    icon={<UserAddOutlined />}
                                    onClick={() => onSearch()}
                                >
                                    Tìm kiếm
                                </Button>
                            </Col> */}
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
