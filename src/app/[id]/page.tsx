"use client"
import { useRouter } from 'next/navigation';
import { epochToString } from "@/utils";
import { useEffect, useState } from 'react';
import http from '../../services/http';

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


    const handlePurch = (idx: number) => {
        const newSeats = { ...seats, [idx + 1]: '1' };

        if (movies) {
            const newMovies = JSON.parse(movies).map((el: any) => {
                if (el._id === params.id) { return { ...el, seats: newSeats } }
                return el;
            })

            localStorage.setItem('movies', JSON.stringify(newMovies));
            setPopulatedArray(populatedArray.map((el, index) => {
                if (index === idx) { return '1' }
                return el;
            }));
        }

        http.put(`movies`, { _id: params.id, seats: newSeats }).then((res) => {
            console.log(res);
        });

    }

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

            <div className="v-space" />
            {/* <h2>Seats:</h2> */}
            <p>Reserve a seat:</p>
            <div className='grid-10-10'>
                {
                    populatedArray.map((el, index) =>
                        <div key={index}>{el === '1' ?
                            <div className="occupied">{index + 1}</div> :
                            <div onClick={() => { handlePurch(index) }} className="free">{index + 1}</div>
                        }
                        </div>)
                }

            </div>
        </div>
    );
};

export default MoviePage;
