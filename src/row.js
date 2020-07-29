import React, { useState, useEffect } from 'react';
import axios from './commom/axios';
import './Row.css';
const base_url = 'https://image.tmdb.org/t/p/original/';
const Row = ({ title, fetchUrl, isLargeRow }) => {
    const [movies, setMovies] = useState([]);

    // a snippet of code which runs based on a specific condition/variable
    useEffect(() => {
        // if [], run once when th row loads, and don't run again
        async function fetchData() {
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
            return request;
        }
        fetchData();
    }, [fetchUrl]);
    console.log(movies)
    return (
        <div className="row">
            {/* title */}
            <h2>{title}</h2>
            <div className="row__posters">
                {/* row__posters */}
                {movies.map((movie) => {
                    return (
                        <img
                            key={movie.id}
                            className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                            src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                            alt={movie.name} />
                    )
                })}
            </div>
            {/* container -> posters */}

            {/*  */}
        </div>
    )
}

export default Row;