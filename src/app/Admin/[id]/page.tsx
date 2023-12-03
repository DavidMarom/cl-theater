"use client"
import { useRouter } from 'next/navigation';
import { epochToString } from "@/utils";
import { useEffect, useState } from 'react';
import http from '../../../services/http';

const MoviePage = ({ params }: { params: { id: string } }) => {
    const movies = localStorage.getItem('movies');
    const movie = movies ? JSON.parse(movies).find((movie: any) => movie._id === params.id) : null;
    const seats = movie ? movie.seats : null;
    const dataArray = Array.from({ length: 100 });
    const [populatedArray, setPopulatedArray] = useState(dataArray);

    useEffect(() => {
        const markedArr = dataArray.map((el, index) => {
            if (seats[index + 1] === '1') { return '1' }
            return '0'
        })
        setPopulatedArray(markedArr);
    }, []);

    return (
        <div>
            <h2>EDIT {movie.title}</h2>
        </div>
    );
};

export default MoviePage;
