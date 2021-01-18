import React from "react";
import "./Home.css";
import {
  API_URL,
  API_KEY,
  IMAGE_BASE_URL,
  POSTER_SIZE,
} from "../../api/config";
import Loader from "../../components/Loader/Loader";
import LoadMoreButton from "../../components/Button/Button";

import MovieItem from "../../components/MovieItem/MovieItem";

class Home extends React.Component {
  state = {
    movies: [],
    heroImage: null,
    loading: false,
    currentPage: 0,
    totalPages: 0,
    genres: [],
    selectGenre: null,
    sort_by: "По популярности",
  };

  componentDidMount() {
    try {
      this.setState({ loading: true });
      const endpoint = `${API_URL}discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&page=${
        this.state.currentPage + 1
      }`;
      const endpointGenre = `${API_URL}genre/movie/list?api_key=${API_KEY}`;
      this.fetchItems(endpoint);
      this.fetchGenres(endpointGenre);
    } catch (error) {
      console.log(error);
    }
  }

  loadMoreItems = () => {
    let endpoint = "";
    this.setState({ loading: true });

    endpoint = `${API_URL}discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&page=${
      this.state.currentPage + 1
    }`;

    this.fetchItems(endpoint);
  };

  fetchItems = (endpoint) => {
    fetch(endpoint)
      .then((result) => result.json())
      .then((result) => {
        if (
          (endpoint.includes("with_genres") &&
          this.state.selectGenre !== null) || endpoint.includes(".desc")
        ) {
          this.setState({
            movies: result.results,
            heroImage: this.state.heroImage || result.results[0],
            loading: false,
            currentPage: result.page,
            totalPages: result.total_pages,
          });
        }
        this.setState({
          movies: [...this.state.movies, ...result.results],
          heroImage: this.state.heroImage || result.results[0],
          loading: false,
          currentPage: result.page,
          totalPages: result.total_pages,
        });
      })
      .catch((error) => console.error("Error:", error));
  };

  fetchGenres = (endpoint) => {
    fetch(endpoint)
      .then((result) => result.json())
      .then((result) => {
        this.setState({
          genres: result.genres,
        });
      })
      .catch((error) => console.error("Error:", error));
  };

  onChange = (event) => {
    this.setState({ selectGenre: event.target.value });
    if (event.target.value !== "all")
      this.fetchItems(
        `${API_URL}discover/movie?api_key=${API_KEY}&sort_by=${this.state.sort_by}.desc&with_genres=${event.target.value}`
      );
  };

  onChangeSort = (event) => {
    this.setState({ sort_by: event.target.value });
    if (this.state.selectGenre == null || this.state.selectGenre === "all") {
      this.fetchItems(
        `${API_URL}discover/movie?api_key=${API_KEY}&sort_by=${event.target.value}.desc`
      );
    } else {
      this.fetchItems(
        `${API_URL}discover/movie?api_key=${API_KEY}&sort_by=${event.target.value}.desc&with_genres=${this.state.selectGenre}`
      );
    }
  };

  renderFilterBar = () => {
    return (
      <div className="filterbar">
        <span>Жанр: </span>
        <select defaultValue={this.state.selectGenre} onChange={this.onChange}>
          <option value="all">Все</option>
          {this.state.genres.map((genre, index) => {
            return (
              <option value={genre.id} key={index}>
                {genre.name}
              </option>
            );
          })}
        </select>
      </div>
    );
  };

  renderFilterBarSorting = () => {
    return (
      <div className="filterbar">
        <span>Сортировать по: </span>
        <select defaultValue={this.state.sort_by} onChange={this.onChangeSort}>
          <option value="popularity">По популярности</option>
          <option value="vote_average">По рейтингу</option>
          <option value="release_date">По новизне</option>
        </select>
      </div>
    );
  };

  render() {
    let selectedMovies = [];
    const selectedGenre = this.state.selectGenre;
    if (selectedGenre === null || selectedGenre === "all") {
      selectedMovies = this.state.movies;
    } else {
      selectedMovies = this.state.movies.filter((movie) =>
        movie.genre_ids.includes(parseInt(selectedGenre))
      );
    }
    console.log(selectedMovies);
    return (
      <>
        {this.renderFilterBar()}
        {this.renderFilterBarSorting()}
        <div className="movies-grid">
          {selectedMovies.map((element, i) => {
            return (
              <MovieItem
                key={i}
                clickable={true}
                image={
                  element.poster_path
                    ? `${IMAGE_BASE_URL}${POSTER_SIZE}${element.poster_path}`
                    : "./images/no_image.jpg"
                }
                movieId={element.id}
                movieName={element.original_title}
              />
            );
          })}
        </div>

        {this.state.loading ? <Loader /> : null}
        {this.state.currentPage <= this.state.totalPages &&
        !this.state.loading ? (
          <LoadMoreButton text="Показать еще" onClick={this.loadMoreItems} />
        ) : null}
      </>
    );
  }
}

export default Home;
