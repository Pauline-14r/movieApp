import type {ICard} from "./types.ts";
import styles from './movieCard.module.css';
import {format} from "date-fns";
import { Rate } from 'antd';

function MovieCard({genre_ids, overview, poster_path, release_date, title, vote_average}: ICard) {
    return (
        <div className={styles.card_container}>
            <img className={styles.card_poster} src={poster_path} alt="poster_path" />
            <div className={styles.card_description}>
                <div className={styles.card_name}>{title}</div>
                <div className={styles.card_rating}>{vote_average}</div>
                <div className={styles.card_date}>{
                    release_date.length > 0 ? format(new Date(release_date), "MMMM dd, yyyy") : " "
                }</div>
                <div className={styles.card_genres}>{genre_ids.map((genre: number) => {
                    return (<span key={genre} className={styles.card_genre}>{genre}</span>)
                })}
                </div>
                <div className={styles.card_overview}>{overview}</div>
                <Rate size={"medium"} value={1} />
            </div>
        </div>
    )
}

export default MovieCard