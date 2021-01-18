import React from "react";
import { API_URL, API_KEY } from "../../api/config";
import Loader from "../../components/Loader/Loader";
import MovieInfo from "../../components/MovieInfo/MovieInfo";

class Movie extends React.Component {
  state = {
    movie: null,
    loading: false,
  };

  componentDidMount() {
    try {
      this.setState({ loading: true });
      const endpoint = `${API_URL}movie/${this.props.match.params.movieId}?api_key=${API_KEY}`;
      this.fetchItems(endpoint);
    } catch (error) {
      console.log(error);
    }
  }

  fetchItems = (endpoint) => {
    fetch(endpoint)
      .then((result) => result.json())
      .then((result) => {
        if (result.status_code) {
          console.log(result.status_code);
          this.setState({ loading: false });
        } else {
          this.setState({ movie: result, loading: false });
        }
      })
      .catch((error) => console.error("Error:", error));
  };
  render() {
    return (
      <div>
        {this.state.movie ? (
          <div>
            <MovieInfo
              movie={this.state.movie}
              time={this.state.movie.runtime}
            />
          </div>
        ) : null}

        {!this.state.movie && !this.state.loading ? (
          <h1>Ничего не найдено</h1>
        ) : null}
        {this.state.loading ? <Loader /> : null}
      </div>
    );
  }
}

export default Movie;
