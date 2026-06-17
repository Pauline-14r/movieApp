import type {ICard} from "./types.ts";

function MovieCard({genre_ids, overview, poster_path, release_date, title, vote_average}: ICard) {
    return (
        <div className="card_container">
            <div className="card_poster">
                <img src={poster_path} alt="poster_path" />
            </div>
            <div className="card_description">
                <div className="card_name">{title}</div>
                <div className="card_rating">{vote_average}</div>
                <div className="card_date">{release_date}</div>
                <div className="card_genres">{genre_ids.map((genre: number) => {
                    return (<span key={genre} className="card_genre">{genre}</span>)
                })}
                </div>
                <div className="card_overview">{overview}</div>
            </div>
        </div>
    )
}

export default MovieCard