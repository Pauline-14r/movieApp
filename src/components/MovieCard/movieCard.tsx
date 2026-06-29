import type {ICard} from "./types.ts";
import styles from './movieCard.module.css';
import {format} from "date-fns";
import { Rate } from 'antd';
import {useContext} from "react";
import {GenresContext} from "../../context/GenresContext.tsx";

function MovieCard({genre_ids, overview, poster_path, release_date, title, vote_average}: ICard) {

    function formatVotes(vote_average: number): string | null {
        const vote = Number(vote_average.toFixed(1));
        if (vote < 3) {
            return styles.rating_red
        }
        if (vote >= 3 && vote <= 5) {
            return styles.rating_orange
        }
        if (vote > 5 && vote <= 7) {
            return styles.rating_yellow
        }
        if (vote > 7) {
            return styles.rating_green
        }
        return null
    }

    const movieGenres = useContext(GenresContext)

    return (
        <div className={styles.card_container}>
            <img className={styles.card_poster} src={poster_path} alt="poster_path" />
            <div className={styles.card_description}>
                <div className={styles.card_name}>{title}</div>
                <div className={styles.card_rating + " " + formatVotes(vote_average)}>
                    {(Number(vote_average.toFixed(1)))}
                </div>
                <div className={styles.card_date}>{
                    release_date.length > 0 ? format(new Date(release_date), "MMMM dd, yyyy") : " "
                }</div>
                <div className={styles.card_genres}>{genre_ids.map((genre: number) => {
                    const requiredGenre = movieGenres.find((g) => g.id === genre);
                    return (
                        <span key={genre} className={styles.card_genre}>
                            {requiredGenre?.name}
                        </span>
                    );
                })}
                </div>

                <div className={styles.card_overview}>{overview}</div>
                <Rate size={"medium"} value={1} />
            </div>
        </div>
    )
}

export default MovieCard