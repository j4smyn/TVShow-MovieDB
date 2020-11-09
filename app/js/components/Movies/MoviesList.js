import React, {Component} from 'react';
import {Link} from 'react-router';
import RateComponent from '../RateComponent';
import Loader from '../Loader';

class MoviesList extends Component {
    constructor(props) {
        super(props);
    }


    renderMoviesList() {
        const {data} = this.props;
        let movies;

        if (data) {
            movies = data.map((movie, i) => {
                let title = movie.title;
                let currentMoviePath = `/movie/${movie.id}`;
                let imageUrl = movie.poster_path ?
                    `http://image.tmdb.org/t/p/w185_and_h278_bestv2${movie.poster_path}`
                    : '../../scss/images/movie-placeholder.jpg';

                return(
                    <div className="movie col-xs-6 col-md-4" key={i}>
                        <div className="imageContent">
                            <Link to={currentMoviePath} alt={title} title={title}>
                                <img src={imageUrl} />
                            </Link>
                        </div>
                        <div className="info">
                            <RateComponent rateClass="movieRate"
                                           rating={movie.vote_average}
                            />
                            <p>{movie.original_title}({movie.title})</p>
                        </div>
                    </div>
                );
            })
        }

        return(
            <div className="results row">
                {movies}
            </div>
        );
    }

    render() {
        const {fetchingMovies} = this.props;

        if (fetchingMovies) {
            return <Loader/>;
        } else {
            return this.renderMoviesList();
        }
    }
}

export default MoviesList;
