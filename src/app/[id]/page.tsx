"use client"
import { epochToString } from "@/utils";
import { useEffect, useState } from 'react';
import http from '../../services/http';

const MoviePage = ({ params }: { params: { id: string } }) => {
    const [isSaving, setIsSaving] = useState(false);
    const movies = localStorage.getItem('movies');
    const movie = movies ? JSON.parse(movies).find((movie: any) => movie._id === params.id) : null;
    const seats = movie ? movie.seats : null;
    const dataArray = Array.from({ length: 100 });
    const [populatedArray, setPopulatedArray] = useState(dataArray);

    useEffect(() => {
        if(!seats) { return }
        const markedArr = dataArray.map((el, index) => {
            if (seats[index + 1] === '1') { return '1' }
            return '0'
        })
        setPopulatedArray(markedArr);
    }, []);

    const handlePurch = (idx: number) => {
        if (isSaving) { return }
        setIsSaving(true);
        const newSeats = { ...seats, [idx + 1]: '1' };
        http.put(`movies`, { _id: params.id, seats: newSeats, requestedSeat: idx + 1 })
            .then(() => {
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
                setIsSaving(false);
            })
            .catch((err) => {
                if (err.response.data.message === 'Seat already taken') {
                    alert('Sorry, the seat was just taken. Try agian.');
                    let newPopulatedArray = [...populatedArray];
                    newPopulatedArray[idx] = '1';
                    setPopulatedArray(newPopulatedArray);
                }
            });
    }

    if(!movie) { return <div>Please refresh</div> }
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
            {isSaving && <div className="saving">Saving...</div>}
        </div>
    );
};

export default MoviePage;
