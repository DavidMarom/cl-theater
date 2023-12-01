"use client"
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { Button, Popconfirm, DatePicker } from "antd";
import { Table } from 'antd'
import { TableFiltersType, MoovieType } from "@/types";
import { epochToString, timeStampToUnixTime } from "@/utils";
import http from '../../services/http';

const { RangePicker } = DatePicker;

const Home = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [range, setRange] = useState([0, 0]);
    const router = useRouter();

    const handleChange = (pagination: any, filters: TableFiltersType) => { setRange(filters.date) };

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
                const { setSelectedKeys, selectedKeys, confirm } = props;
                return (
                    <div style={{ padding: 8 }}>
                        <RangePicker
                            value={selectedKeys}
                            onChange={(dates: any) => {
                                setSelectedKeys(dates);
                                confirm();
                            }}
                            onOk={confirm}
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

                return record.date >= timeStampToUnixTime(range[0]) && record.date <= timeStampToUnixTime(range[1])
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
            render: (text: any, record: MoovieType) => (
                <Button style={{ backgroundColor: '#2196F3', color: 'white' }} type="primary" onClick={() => {
                    router.push(`/${record._id}`)
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
