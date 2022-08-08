import React, { useState } from "react";
import Axios from "axios";

import Movie from "./components/Movie";
import MovieInfo from "./components/MovieInfo";
import ScreenTime from './components/ScreenTime';
import searchicon  from './searchicon.svg';
import movieicon from './movieicon.svg';
import './styles/Home.css';

export const API_KEY = "4bac7537";



const App = () => {
  const [searchQuery, updateSearchQuery] = useState("");

  const [movieList, updateMovieList] = useState([]);
  const [selectedMovie, onMovieSelect] = useState();

  const [timeoutId, updateTimeoutId] = useState();

  const fetchData = async (searchString) => {
    const response = await Axios.get(
      `https://www.omdbapi.com/?s=${searchString}&apikey=${API_KEY}`,
    );
    updateMovieList(response.data.Search);
  };

  const onTextChange = (e) => {
    e.persist();
    onMovieSelect("")
    clearTimeout(timeoutId);
    updateSearchQuery(e.target.value);
    const timeout = setTimeout(() => fetchData(e.target.value), 500);
    updateTimeoutId(timeout);
  };
  return (
    <React.Fragment>
    <ScreenTime/>
    <div className="Container">
      <div className="Header">
        <div className="AppName">
          <img src={movieicon} alt="movie-icon" />
          React Movie App
        </div>
        <div className="SearchBox">
          <img className="SearchIcon" src={searchicon} alt="search-icon"/>
          <input className="SearchInput"
            placeholder="Search Movie"
            value={searchQuery}
            onChange={onTextChange}
          />
        </div>
      </div>
      
      {selectedMovie && <MovieInfo selectedMovie={selectedMovie} onMovieSelect={onMovieSelect}/>}
      <div className="MovieListContainer">
        {movieList?.length ? (
          movieList.map((movie, index) => (
            <Movie
              key={index}
              movie={movie}
              onMovieSelect={onMovieSelect}
            />
          ))
        ) : (
          <img className="Placeholder" src={movieicon} alt="movie-icon" />
        )}
      </div>
    </div>
    </React.Fragment>
  );
}

export default App;