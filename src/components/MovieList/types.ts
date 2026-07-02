import type {ICard} from "../MovieCard/types.ts";

export interface IList {
    // page: number;
    results: ICard[];
    onRate: (movieId: number, rating: number) => void;
    // total_pages: number;
    // total_results: number;
}