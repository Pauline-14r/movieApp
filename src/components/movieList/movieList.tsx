import type {IList} from "./types.ts";
import type {ICard} from "../movieCard/types.ts";
import MovieCard from "../movieCard/movieCard.tsx";

function MovieList({results}: IList) {
    return (
        <div className="movieList_wrapper">
            {results.length > 0 ? results.map((result: ICard) => (
                <MovieCard key={result.id}
                           genre_ids={result.genre_ids}
                           id={result.id}
                           overview={result.overview}
                           poster_path={`https://api.themoviedb.org/3/configuration${result.poster_path}`}
                           release_date={result.release_date}
                           title={result.title}
                           vote_average={result.vote_average} />
            )) : <p>Ничего не найдено</p>}
        </div>
    )
}

export default MovieList;