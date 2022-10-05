import React from 'react';

const MovieCard = ({ movie, selectMovie }) => {
  const IMAGE_PATH = 'https://image.tmdb.org/t/p/w500';

  return (
    <div className={'movie-card'} onClick={() => selectMovie(movie)}>
      {movie.poster_path ? (
        <img
          className={'movie-cover'}
          src={`${IMAGE_PATH}${movie.poster_path}`}
          alt=""
        />
      ) : (
        <div className={'movie-placeholder'}>No image found </div>
      )}
      <h5 className={'movie-title'}>{movie.title}</h5>
      {movie.vote_average ? (
        <span className={'movie-voting'}>{movie.vote_average}</span>
      ) : null}
    </div>
  );
};

export default MovieCard;
