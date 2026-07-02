import type {IList} from "../components/MovieList/types.ts";

interface IOptions {
    method: string;
    headers: {
        'Content-Type'?: string;
        accept: string;
        Authorization: string;
    }
    body?: string;
}

const getOptions: IOptions = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMjA5NGNiYmI2ZDg0MDAxN2VkNjhhNjY3NWEzYjBkMiIsIm5iZiI6MTY3NDU5MjAxMy4yMjUsInN1YiI6IjYzZDAzZjBkZTcyZmU4MDA4NDkwM2I2YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lZDx1GuRxHv7YXGqOjMcxP9DxvTRoBm12fabnsaECmA'
    }
};

interface ISession {
    success: boolean;
    guest_session_id: string;
    expires_at: string;
}

interface IRating {
    status_code: number;
    status_message: string;
}


export async function getMovies(query: string, page: number): Promise<IList> {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=${page}&query=${query}`, getOptions)
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        const movies: IList = await response.json();
        return movies;
    } catch (error) {
        if (error instanceof Error) {
            console.error('Ошибка', error);
        }
        throw error;
    }
}

export async function createGuestSession() {
    try {
        const response = await fetch('https://api.themoviedb.org/3/authentication/guest_session/new', getOptions)
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        const session: ISession = await response.json();
        return session;
    } catch (error) {
        if (error instanceof Error) {
            console.error('Ошибка', error)
        }
        throw error;
    }
}

export async function rateMovie(movieId: number, rating: number, guestSessionId: string) {

    const postOptions: IOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            accept: 'application/json',
            Authorization: 'Bearer ••••'
        },
        body: JSON.stringify({value: rating})
    }

    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/rating?guest_session_id=${guestSessionId}`, postOptions)
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        const ratedMovie: IRating = await response.json();
        return ratedMovie;
    } catch (error) {
        if (error instanceof Error) {
            console.error('Ошибка', error)
        }
        throw error;
    }
}