import {useState, useEffect} from "react";
import './App.module.css'
import {getMovies} from "./api/api_query.ts";
import type {IList} from "./components/movieList/types.ts";
import MovieList from "./components/movieList/movieList.tsx";

function App() {
    const [data, setData] = useState<IList | null>(null);
    useEffect(() => {
        const fetchData = async() => {
            const result = await getMovies('return');
            console.log(result);
            setData(result);
        }
        fetchData().catch(console.error);
    }, []);

  return (
      <div>
        <h1>Movie App</h1>
          {data && <MovieList results={data?.results}/>}
      </div>
  )
}

export default App
