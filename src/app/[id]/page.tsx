"use client"
import { useRouter } from 'next/navigation';
import { epochToString } from "@/utils";
import { useEffect, useState } from 'react';

const MoviePage = ({ params }: { params: { id: string } }) => {

    const movies = localStorage.getItem('movies');
    const movie = movies ? JSON.parse(movies).find((movie: any) => movie._id === params.id) : null;

    const seats = movie ? movie.seats : null;
    const dataArray = Array.from({ length: 100 });

    const [populatedArray, setPopulatedArray] = useState(dataArray);


    useEffect(() => {
        const aaa = dataArray.map((el, index) => {
            if (seats[index + 1] === '1') {
                return '1'
            }
            return '0'
        })
        setPopulatedArray(aaa);
    }, []);



    return (
        <div>
            <h2>{movie.title}</h2>
            <div className="movie-details">
                <p><b>Description:</b> {movie.description}</p>
            </div>
            <div className="movie-details">
                <p><b>Duration: </b>{movie.duration} min.</p>
                <div className="w-space" />
                <p><b>Date: </b>{epochToString(movie.date)}</p>
            </div>

            <div className='grid-10-10'>

                {
                    populatedArray.map((el, index) => <div key={index}>{el === '1' ? '' : 'Free'}</div>)
                }

            </div>

        </div>
    );
};

export default MoviePage;
