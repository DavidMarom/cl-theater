"use client"
import React, { useEffect, useState } from "react";
import { Table } from 'antd'
import { columns } from './columns.js';
import http from '../../services/http';

const Home = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        http.get('movies').then((res) => {
            setMovies(res.data);
        });
    }, []);

    return (
        <>
            <Table
                columns={columns}
                dataSource={movies}
                rowKey="_id"

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
        </>
    )
}
export default Home;
