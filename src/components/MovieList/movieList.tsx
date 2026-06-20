import type {IList} from "./types.ts";
import type {ICard} from "../MovieCard/types.ts";
import MovieCard from "../MovieCard/movieCard.tsx";
import styles from "./movieList.module.css";

function MovieList({results}: IList) {
    return (
        <div className={styles.movieList_wrapper}>
            {results.length > 0 ? results.map((result: ICard) => (
                <MovieCard key={result.id}
                           genre_ids={result.genre_ids}
                           id={result.id}
                           overview={result.overview}
                           poster_path={`https://image.tmdb.org/t/p/w500${result.poster_path}`}
                           release_date={result.release_date}
                           title={result.title}
                           vote_average={result.vote_average} />
            )) : <p>Ничего не найдено</p>}
        </div>
    )
}

export default MovieList;