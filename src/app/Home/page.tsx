"use client"
import React, { useEffect, useState } from "react";
import { Button, Popconfirm, DatePicker } from "antd";
import { Table } from 'antd'
import http from '../../services/http';

const { RangePicker } = DatePicker;

const timeStamptoUnixTime = (timestamp: number) => {
    return new Date(timestamp).getTime();
}

const Home = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [range, setRange] = useState([0, 0]);

    const handleChange = (pagination: any, filters: any, sorter: any) => {
        setRange(filters.date);
    };

    useEffect(() => {
        const lsMovies = localStorage.getItem('movies');
        if (lsMovies) { setMovies(JSON.parse(lsMovies)) }
        setLoading(true);
        http.get('movies').then((res) => {
            setMovies(res.data);
            localStorage.setItem('movies', JSON.stringify(res.data));
            setLoading(false);
        });
    }, []);


    const epochToString = (epoch: number) => {
        const date = new Date(epoch);
        return date.toLocaleDateString();
    }

    const columns = [
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
            render: (date: number) => epochToString(date),

            filterDropdown: (props: any) => {
                const { setSelectedKeys, selectedKeys, confirm, clearFilters } = props;
                return (
                    <div style={{ padding: 8 }}>
                        <RangePicker
                            value={selectedKeys}
                            onChange={(dates: any) => {
                                setSelectedKeys(dates);
                                confirm();
                            }}
                            onOk={confirm}
                        // onClear={clearFilters}
                        />
                    </div>
                );
            },
            filterIcon: (filtered: any) => (
                <span style={{ color: filtered ? '#1890ff' : undefined }}>
                    Filter
                </span>
            ),
            onFilter: (value: any, record: any) => {
                return record.date >= timeStamptoUnixTime(range[0]) && record.date <= timeStamptoUnixTime(range[1])
            }

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
            render: (text: any, record: any) => (
                <Button style={{ backgroundColor: '#2196F3', color: 'white' }} type="primary" onClick={() => {
                    console.log(record._id)
                }}
                >Purchase</Button>
            ),

        }
    ];

    return (
        <>
            <Table
                columns={columns}
                dataSource={movies}
                rowKey="_id"

                onChange={handleChange}


                pagination={{
                    showSizeChanger: true,
                    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                    pageSizeOptions: ['5', '10', '20', '50'],
                    defaultPageSize: 5,
                    defaultCurrent: 1,
                    total: movies.length,
                    position: ['bottomCenter']
                }}

            />
            {loading && <div>Loading&#8230;</div>}

        </>
    )
}
export default Home;
