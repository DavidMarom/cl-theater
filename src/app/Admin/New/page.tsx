"use client"
import { useRouter } from 'next/navigation';
import { timeStampToUnixTime } from "@/utils";
import { useState } from 'react';
import { useForm, SubmitHandler } from "react-hook-form"
import http from '../../../services/http';

interface FormData {
    title: string;
    description: string;
    duration: number;
    date: number;
    seats: { [key: string]: boolean };
}

const MoviePage = ({ params }: { params: { id: string } }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [duration, setDuration] = useState(0);
    const [date, setDate] = useState(new Date().getTime());
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const router = useRouter();

    const onSubmit: SubmitHandler<FormData> = (data) => {
        setIsLoading(true);
        const newMovie = {
            title: data.title,
            description: data.description,
            duration: data.duration,
            date: timeStampToUnixTime(data.date),
            seats: {}
        };

        http.post(`movie`, newMovie)
            .then(() => {
                alert('Movie added!');
                router.push('/Admin');
            })
            .catch((err) => { console.log(err) }
            )
    };

    return (
        <div>
            <h2>Add a new movie</h2>

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
                {
                    isLoading
                        ? <p>Adding the movie...</p>
                        : <button type="submit">Submit</button>
                }
                
            </form>
        </div>
    );
};

export default MoviePage;
