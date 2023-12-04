"use client"
import { useRouter } from 'next/navigation';
import { epochToString, timeStampToUnixTime } from "@/utils";
import { FormEventHandler, useEffect, useState } from 'react';
import { useForm, SubmitHandler } from "react-hook-form"
import http from '../../../services/http';

interface FormData {
    title: string;
    description: string;
    duration: number;
    date: number;
}

const MoviePage = ({ params }: { params: { id: string } }) => {
    const movies = localStorage.getItem('movies');
    const movie = movies ? JSON.parse(movies).find((movie: any) => movie._id === params.id) : null;
    const seats = movie ? movie.seats : null;
    const dataArray = Array.from({ length: 100 });
    const [populatedArray, setPopulatedArray] = useState(dataArray);
    const router = useRouter();
    const [title, setTitle] = useState(movie.title);
    const [description, setDescription] = useState(movie.description);
    const [duration, setDuration] = useState(movie.duration);
    const [date, setDate] = useState(movie.date);
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();


    useEffect(() => {
        const markedArr = dataArray.map((el, index) => {
            if (seats[index + 1] === '1') { return '1' }
            return '0'
        })
        setPopulatedArray(markedArr);
    }, []);

    const onSubmit: SubmitHandler<FormData> = (data) => {
        const newMovie = {
            ...movie,
            title: data.title,
            description: data.description,
            duration: data.duration,
            date: timeStampToUnixTime(data.date),
        };

        http.put(`movie`, newMovie)
            .then((res) => {
                console.log(res);
                alert('Movie updated!');

            })
            .catch((err) => { console.log(err) }
            )
    };

    return (
        <div>
            <h2>Edit the movie "{movie.title}"</h2>

            <form onSubmit={handleSubmit(onSubmit)} className='movie-form'>
                <div>
                    <label htmlFor="title">Title: </label>
                    <input
                        {...register('title', { required: 'title is required' })}
                        type="text"
                        value={title}
                        onChange={(e) => { setTitle(e.target.value) }}
                    />
                    {errors.title ? <p className='error-text'>{errors.title.message}</p> : <p className='error-text-hide'>-</p>}
                </div>
                <div>
                    <label htmlFor="description">Description: </label>
                    <input
                        {...register('description', { required: 'description is required' })}
                        type="text"
                        value={description}
                        onChange={(e) => { setDescription(e.target.value) }}
                    />
                    {errors.description ? <p className='error-text'>{errors.description.message}</p> : <p className='error-text-hide'>-</p>}
                </div>
                <div>

                    <label htmlFor="duration">Duration: </label>
                    <input
                        {...register('duration', { required: 'duration is required' })}
                        type="number"
                        value={duration}
                        onChange={(e) => { setDuration(Number(e.target.value)) }}
                    />
                    {errors.duration ? <p className='error-text'>{errors.duration.message}</p> : <p className='error-text-hide'>-</p>}
                </div>
                <div>

                    <label htmlFor="date">Date: </label>
                    <input
                        {...register('date', { required: 'date is required' })}
                        type="date"
                        value={new Date(date).toISOString().slice(0, 10)}
                        onChange={(e) => { setDate(new Date(e.target.value).getTime()) }}
                    />
                </div>



                <br />
                <button type="submit">Submit</button>
            </form>


        </div>
    );
};

export default MoviePage;
