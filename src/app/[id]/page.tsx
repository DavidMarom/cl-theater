"use client"
import { useRouter } from 'next/navigation';


const MoviePage = ({ params }: { params: { id: string } }) => {

    const movies= localStorage.getItem('movies');
    const movie = movies ? JSON.parse(movies).find((movie: any) => movie._id === params.id) : null;

    return (
        <div>
            <h1>{params.id}</h1>
            
        </div>
    );
};

export default MoviePage;
