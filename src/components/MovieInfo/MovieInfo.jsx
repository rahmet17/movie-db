import React from "react";
import { IMAGE_BASE_URL, POSTER_SIZE } from "../../api/config";
import MovieItem from "../MovieItem/MovieItem";
import Button from "../Button/Button";
import "./MovieInfo.css";

class MovieInfo extends React.Component {
  state = {
    localStorageUpdate: null,
  };

  addRemoveMovie = (movie) => {
    if (localStorage.getItem(`${movie.id}`)) {
      localStorage.removeItem(`${movie.id}`);
      this.setState({
        localStorageUpdate: "Deleted",
      });
    } else {
      this.setState({
        localStorageUpdate: "Added",
      });
      localStorage.setItem(`${movie.id}`, JSON.stringify(movie));
    }
  };

  render() {
    return (
      <div className="movieinfo-content">
        <div className="movieinfo-item">
          <MovieItem
            image={`${IMAGE_BASE_URL}${POSTER_SIZE}${this.props.movie.poster_path}`}
            clickable={false}
          />
          <Button
            text={
              localStorage.getItem(`${this.props.movie.id}`)
                ? "Удалить из избранного"
                : "Добавить в избранное"
            }
            onClick={() => {
              this.addRemoveMovie(this.props.movie);
            }}
          />
        </div>
        <div className="movieinfo-text">
          <h1>{this.props.movie.title}</h1>
          <h2>Сюжет:</h2>
          <p>{this.props.movie.overview}</p>
          <h3>Рейтинг IMDB: {this.props.movie.vote_average}/10</h3>
        </div>
      </div>
    );
  }
}

export default MovieInfo;
