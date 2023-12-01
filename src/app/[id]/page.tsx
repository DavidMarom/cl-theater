"use client"
import { useRouter } from 'next/navigation';




const MoviePage = ({ params }: { params: { id: string } }) => {
    const router = useRouter();
    
    return (
        <div>
            <h1>{params.id}</h1>
            <h1>{params.id}</h1>
            <h1>{params.id}</h1>
        </div>
    );
};

export default MoviePage;
