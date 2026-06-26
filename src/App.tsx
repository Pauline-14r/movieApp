import {useState, useEffect} from "react";
import './App.module.css'
import {getMovies} from "./api/api_query.ts";
import type {IList} from "./components/MovieList/types.ts";
import MovieList from "./components/MovieList/movieList.tsx";
import styles from "./App.module.css";

import { Spin, Alert, Pagination} from 'antd';
import SearchInput from "./components/SearchInput/searchInput.tsx";

function App() {
    const [data, setData] = useState<IList | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [query, setQuery] = useState<string>("");
    const [page, setPage] = useState<number>(1);

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

  return (
      <div className={styles.app_wrapper}>
          {error !== null && <Alert description={error}/>}
          <SearchInput handleInput={handleInput} />
          {loading && <Spin />}
          {data && <MovieList results={data.results}/>}
          <Pagination current={page} onChange={handlePageChange} total={50}/>
      </div>
  )
}

export default App
