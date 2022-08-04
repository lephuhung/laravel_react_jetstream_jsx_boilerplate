import AppLayout from "@/Layouts/AppLayout";
import JetstreamDefault from "@/Jetstream/JetstreamDefault";
import {
    Table,
    Col,
    Row
} from 'antd'
const Dashboard = ({post}) => {
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
    console.log(post)
    return (
        <AppLayout header={
            <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                Dashboard
            </h2>
        }>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg">
                        <Table columns={columns} dataSource={post.data}/>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default Dashboard;
