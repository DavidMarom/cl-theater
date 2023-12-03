"use client"
import { useRouter } from 'next/navigation';
import { epochToString } from "@/utils";
import { FormEventHandler, useEffect, useState } from 'react';
import { useForm, SubmitHandler } from "react-hook-form"
import http from '../../../services/http';

interface FormData {
    title: string;
}

const MoviePage = ({ params }: { params: { id: string } }) => {
    const movies = localStorage.getItem('movies');
    const movie = movies ? JSON.parse(movies).find((movie: any) => movie._id === params.id) : null;
    const seats = movie ? movie.seats : null;
    const dataArray = Array.from({ length: 100 });
    const [populatedArray, setPopulatedArray] = useState(dataArray);
    const router = useRouter();
    const [title, setTitle] = useState(movie.title);
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();


    useEffect(() => {
        const markedArr = dataArray.map((el, index) => {
            if (seats[index + 1] === '1') { return '1' }
            return '0'
        })
        setPopulatedArray(markedArr);
    }, []);

    const onSubmit: SubmitHandler<FormData> = (data) => {
        const newMovie = { ...movie, title: data.title };
        console.log(newMovie);

        http.put(`movie`, newMovie)
            .then((res) => {
                console.log(res);
                // router.push('/admin');

            })
            .catch((err) => { console.log(err) }
            )
    };

    return (
        <div>
            <h2>Edit the movie "{movie.title}"</h2>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="title">Title: </label>
                    <input
                        {...register('title', { required: 'title is required' })}
                        type="text"
                        value={title}
                        onChange={(e) => { setTitle(e.target.value) }}
                    />
                </div>
                <br />
                <button type="submit">Submit</button>
            </form>


        </div>
    );
};

export default MoviePage;
