"use client"
import React, { useEffect } from "react";
import http from '../../services/http';

const Home = () => {
    useEffect(() => {
        http.get('movies').then((res) => {
            console.log(res);
        });
    }, []);

    return (
        <h1>Home</h1>
    )
}
export default Home;
