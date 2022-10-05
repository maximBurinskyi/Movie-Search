import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import MovieCard from './components/MovieCard';
import YouTube from 'react-youtube';

function App() {
  const API_URL = 'https://api.themoviedb.org/3';

  const IMAGE_PATH = 'https://image.tmdb.org/t/p/w1280';
  const API_KEY = '80284ee944294cf8e46f017a1aea0f44';

  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState({});
  const [searchKey, setSearchKey] = useState('');
  const [playTrailer, setPlayTrailer] = useState(false);

  const fetchMovies = async (searchKey) => {
    const type = searchKey ? 'search' : 'discover';
    const {
      data: { results },
    } = await axios.get(`${API_URL}/${type}/movie`, {
      params: {
        //api_key: process.env.REACT_APP_MOVIE_API_KEY,
        api_key: API_KEY,
        query: searchKey,
      },
    });
    //console.log('data', data);
    setMovies(results);
    await selectMovie(results[0]);
  };

  const fetchMovie = async (id) => {
    const { data } = await axios.get(`${API_URL}/movie/${id}`, {
      params: {
        //api_key: process.env.REACT_APP_MOVIE_API_KEY,
        api_key: API_KEY,
        append_to_response: 'videos',
      },
    });
    return data;
  };

  const selectMovie = async (movie) => {
    const data = await fetchMovie(movie.id);
    console.log(data);

    setSelectedMovie(movie);
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  // const renderMovies = () => {
  //   movies.map(movie => {})
  // }

  const searchMovies = (e) => {
    e.preventDefault();
    fetchMovies(searchKey);
  };

  const renderTrailer = () => {
    const trailer = selectedMovie.videos.results.find(
      (vid) => vid.name === 'Official Trailer'
    );
    return (
      <YouTube
        videoId={trailer}
        containerClassName={'youtube-container'}
        opts={{
          width: '100%',
          height: '100%',
        }}
      />
    );
  };

  return (
    <div className="App">
      <header className={'header'}>
        <div className={'header-content max-center'}>
          <span>Movie Trailer App</span>
          <form onSubmit={searchMovies}>
            <input type="text" onChange={(e) => setSearchKey(e.target.value)} />
            <button type={'submit'}>Search!</button>
          </form>
        </div>
      </header>

      {/* <div
        className="hero"
        style={{
          backgroundImage: `url('${IMAGE_PATH}${selectedMovie.backdrop_path}')`,
        }}
      >
        <div className="hero-content max center">
          {selectedMovie.videos && playTrailer ? renderTrailer() : null}

          <button className={'button'} onClick={() => setPlayTrailer(true)}>
            Play Trailer
          </button>

          <h1 className={'hero-title'}>{selectedMovie.title}</h1>

          {selectedMovie.overview ? (
            <p className={'hero-overview'}> {selectedMovie.overview} </p>
          ) : null}
        </div>
      </div> */}

      <div
        className="hero"
        style={{
          backgroundImage: `url('${IMAGE_PATH}${selectedMovie.backdrop_path}')`,
        }}
      >
        <div className="hero-content max-center">
          {selectedMovie.videos && playTrailer ? renderTrailer() : null}

          <button className={'button'} onClick={() => setPlayTrailer(true)}>
            Play Trailer
          </button>
          <h1 className={'hero-titles'}>{selectedMovie.title}</h1>
          {selectedMovie.overview ? (
            <p className={'hero-overview'}> {selectedMovie.overview} </p>
          ) : null}
        </div>
      </div>

      <div className="container max-center">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} selectMovie={selectMovie} />
        ))}
      </div>
    </div>
  );
}

export default App;
