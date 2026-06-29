import {createContext, useEffect, useState} from "react";

interface IGenre {
    id: number;
    name: string;
}

interface IGenresList {
    genres: IGenre[];
}

interface IOptions {
    method: string,
    headers: {
        accept: string;
        Authorization: string;
    }
}

const options: IOptions = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMjA5NGNiYmI2ZDg0MDAxN2VkNjhhNjY3NWEzYjBkMiIsIm5iZiI6MTY3NDU5MjAxMy4yMjUsInN1YiI6IjYzZDAzZjBkZTcyZmU4MDA4NDkwM2I2YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lZDx1GuRxHv7YXGqOjMcxP9DxvTRoBm12fabnsaECmA'
    }
}

export const GenresContext = createContext<IGenre[]>([]);
export const GenresContextProvider = ({children}: { children: React.ReactNode }) => {
    const [genres, setGenres] = useState<IGenre[]>([]);

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const result = await fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', options);
                if(!result.ok) {
                    throw new Error('No result');
                }
                const genresList: IGenresList = await result.json();
                setGenres(genresList.genres)
            } catch (error) {
                if (error instanceof Error) {
                    console.error(error);
                }
            }
        }
        fetchGenres().catch(console.error);
    }, []);

    return (
        <GenresContext.Provider value={genres}>
            {children}
        </GenresContext.Provider>
    )
}