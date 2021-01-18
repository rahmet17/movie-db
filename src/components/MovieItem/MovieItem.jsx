import React from "react";
import { Link } from "react-router-dom";
import "./MovieItem.css";

const MovieItem = (props) => {
    return (
     <div className="movie-item">
     {props.clickable ?
     <Link to={{pathname: `/${props.movieId}`, movieName: `${props.movieName}`}}>
            <img src={props.image} alt="movie" />
         </Link>
         :
         <img src={props.image} alt="movie" />  
     }
     <div>
         {props.movieName}
     </div>
     </div>
    )
}

export default MovieItem;
