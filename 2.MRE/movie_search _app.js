
=============================================
App.js
=============================================

import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import SearchIcon from './search.svg'
import MovieCard from './MovieCard';


const App = () => {

    const API_URL = 'http://www.omdbapi.com?apikey=c923b0d2'


    //react state management
    const [movies, setMovies] = useState([]);

    //gets called whenever the page loaded
    useEffect(() => {
      searchMovies("Batman");
      console.log("heelo " + movies.length)
    }, []);
  
    const searchMovies = async (title) => {
      const response = await fetch(`${API_URL}&s=${title}`);
      const data = await response.json();
  
      setMovies(data.Search);
    };

    return ( 
        <div className='app'>
            <h1>WorldMovie</h1>
            <div className='search'>
                <input 
                type="text" 
                placeholder='Enter Movie name' 
                // value={'Superman'}
                // onChange={event => {this.setState({query: event.target.value})}}
                onKeyPress={event => {
                if (event.key === 'Enter') {
                  searchMovies(event.target.value)
                }
              }}
                 />
            </div>
            {/* <img src="{SearchIcon}" alt="search" 
            onClick={()=>{}} /> */}

                    
            {movies?.length > 0 ? (
                <div className="container">
                {movies.map((movie) => (
                    <MovieCard movie={movie} />
                ))}
                </div>
            ) : (
                <div className="empty">
                <h2>No movies found</h2>
                </div>
            )}
        </div>
    );
}

export default App;



=============================================
Movie card
=============================================

import React from "react"

const MovieCard = ({movie}) => {
    return (
        <div className='movie'>
            <div>
                <p>{movie.Year}</p>
            </div>
            <div>
                <img src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/400'} 
                alt={movie.Title} />
            </div>
            <div>
                <span>{movie.Type}</span>
                <h3>{movie.Title}</h3>
            </div>
        </div>
    )
}

export default MovieCard