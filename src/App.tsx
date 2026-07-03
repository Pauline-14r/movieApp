import {useState, useEffect} from "react";
import './App.module.css'
import {createGuestSession, getMovies, getRatedMovies, type IRating, rateMovie} from "./api/api_query.ts";
import type {IList} from "./components/MovieList/types.ts";
import type {IRatedMovies} from "./api/api_query.ts";
import MovieList from "./components/MovieList/movieList.tsx";
import styles from "./App.module.css";

import { Spin, Alert, Pagination, Tabs} from 'antd';
import SearchInput from "./components/SearchInput/searchInput.tsx";

function App() {
    const [data, setData] = useState<IList | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [query, setQuery] = useState<string>("");
    const [page, setPage] = useState<number>(1);
    const [guestSessionId, setGuestSessionId] = useState<string | null>(null);
    const [ratedMovies, setRatedMovies] = useState<IRatedMovies | null>(null);

    useEffect(() => {
        const startSession = async () => {
            try {
                const data = await createGuestSession();
                setGuestSessionId(data.guest_session_id)
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                }
            }
        }
        startSession().catch(console.error);
    }, []);

    const [activeTab, setActiveTab] = useState<"search" | "rated">("search");

    function handleTabChange(tab: string): void {
        setActiveTab(tab as "search" | "rated");
    }

    function handlePageChange(page: number) {
        setPage(page);
    }

    function handleInput (value: string) {
        setQuery(value)
    }

    useEffect(() => {
        const trimmedQuery = query.trim();
        const fetchData = async() => {
            setLoading(true);
            try {
                const result = await getMovies(trimmedQuery === "" ? "return" : trimmedQuery, page);
                console.log(result);
                setData(result);
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                }
            } finally {
                setLoading(false);
            }
        }
        fetchData().catch(console.error);
    }, [query, page]);

    async function handleRate(movieId: number, rating: number) {
        if (guestSessionId !== null) {
            const result: IRating = await rateMovie(movieId, rating, guestSessionId);
            console.log(result);
            const rated = await getRatedMovies(guestSessionId);
            setRatedMovies(rated);
        }
    }

  return (
      <div className={styles.app_wrapper}>
          {error !== null && <Alert description={error}/>}
          <Tabs activeKey={activeTab}
                onChange={handleTabChange}
                items={[
                    {
                        key: "search",
                        label: "search",
                        children: <div>
                            <SearchInput handleInput={handleInput} />
                            {loading && <Spin />}
                            {data && <MovieList
                                results={data.results}
                                onRate={handleRate}
                            />}
                            <Pagination current={page} onChange={handlePageChange} total={50}/>
                        </div>
                    },
                    {
                        key: "rated",
                        label: "rated",
                        children: <div>
                            {loading && <Spin />}
                            {ratedMovies && <MovieList results={ratedMovies.results} onRate={handleRate} />}
                        </div>
                    }
                ]}
          />
      </div>
  )
}

export default App
