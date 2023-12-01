import React from "react";
import { Button, Popconfirm, DatePicker } from "antd";


const formatDate = (date: string) => {
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
        sorter: (a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime(),
        render: (date: string) => formatDate(date)
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
        render: (duration: number) => `${duration} min`
    },
    {
        title: 'Action',
        key: 'action',
        
    }
];