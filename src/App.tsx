import {useState, useEffect} from "react";
import './App.module.css'
import {getMovies} from "./api/api_query.ts";
import type {IList} from "./components/MovieList/types.ts";
import MovieList from "./components/MovieList/movieList.tsx";
import styles from "./App.module.css";

import { Spin, Alert} from 'antd';

function App() {
    const [data, setData] = useState<IList | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async() => {
            setLoading(true);
            try {
                const result = await getMovies('return');
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
    }, []);

  return (
      <div className={styles.app_wrapper}>
          {error !== null && <Alert description={error}/>}
          {loading && <Spin />}
          {data && <MovieList results={data.results}/>}
      </div>
  )
}

export default App
