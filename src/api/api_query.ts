import type {IList} from "../components/MovieList/types.ts";

interface IOptions {
    method: string;
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
};

export async function getMovies(query: string): Promise<IList> {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1&query=${query}`, options)
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