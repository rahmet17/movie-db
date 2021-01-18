import React from "react";
import "./Favourites.css";
import MovieItem from "../../components/MovieItem/MovieItem";
import { IMAGE_BASE_URL, POSTER_SIZE } from "../../api/config";
import Button from "../../components/Button/Button";

class Favourites extends React.Component {
  state = {
    favouritesMovies: [],
  };

  componentDidMount() {
    this.getMoviesFromFavourite();
  }

  getMoviesFromFavourite = () => {
    let movies = [];
    for (let i = 0; i < localStorage.length; i++) {
      let key = localStorage.key(i);
      movies.push(JSON.parse(localStorage.getItem(key)));
    }
    if (movies) {
      this.setState({ favouritesMovies: movies });
    }
  };

  onDeleteMovie = (id) => {
    localStorage.removeItem(`${id}`);
    this.getMoviesFromFavourite();
  };

  render() {
    return (
      <div className="movies-grid">
        {this.state.favouritesMovies.map((element, i) => {
          return (
            <div>
              <MovieItem
                key={element.id}
                clickable={true}
                image={
                  element.poster_path
                    ? `${IMAGE_BASE_URL}${POSTER_SIZE}${element.poster_path}`
                    : "./images/no_image.jpg"
                }
                movieId={element.id}
                movieName={element.original_title}
              />
              <Button
                text="Удалить из избранного"
                onClick={() => {
                  this.onDeleteMovie(element.id);
                }}
              />
            </div>
          );
        })}
      </div>
    );
  }
}

export default Favourites;
