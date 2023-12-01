import { Button, Popconfirm, DatePicker } from "antd";

const formatDate = (date) => {
    const d = new Date(date);
    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`
}



export const columns = [
    {
        title: '',
        dataIndex: '_id',
        key: '_id',
        width: "1px",
        render: () => '',
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
        sorter: (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
        render: (date) => formatDate(date)
    },
    {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
    },
    {
        title: 'Duration',
        dataIndex: 'duration',
        key: 'duration',
        render: (duration) => `${duration} min`
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