import { Button, Popconfirm } from "antd";

const formatDate = (date) => {
    const d = new Date(date);
    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`
}

export const columns = [
    {
        title: 'ID',
        dataIndex: '_id',
        key: '_id',
        render: (text, record, index) => index + 1,
    },
    {
        title: 'Title',
        width: "300px",
        dataIndex: 'title',
        key: 'title',
    },
    {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
        render: (date) => formatDate(date)
    },
    {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
    },
    {
        title: 'Action',
        key: 'action',
        render: (el) => (
            <span>
                <Button style={{ backgroundColor: '#2196F3', color: 'white' }} type="primary" onClick={() => {
                    console.log(el)
                }}
                >Purchase</Button>
                {/* <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.id)}>
                    <Button type="danger" style={{ marginLeft: "10px" }}>Delete</Button>
                </Popconfirm> */}
            </span>
        ),
    },
];