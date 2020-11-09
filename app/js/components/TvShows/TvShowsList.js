import React, {Component} from 'react';
import {Link} from 'react-router';
import RateComponent from '../RateComponent';
import Loader from '../Loader';

class TvShowsList extends Component {
    constructor(props) {
        super(props);
    }

    renderTvShowsList() {
        const {data} = this.props;
        let movies;

        if (data) {
            movies = data.map((tv, i) => {
                let name = tv.title;
                let currentTvShowPath = `/tv/${tv.id}`;
                let imageUrl = tv.poster_path ?
                    `http://image.tmdb.org/t/p/w185_and_h278_bestv2${tv.poster_path}`
                    : '../../scss/images/movie-placeholder.jpg';

                return(
                    <div className="tvShow col-xs-6 col-md-4" key={i}>
                        <div className="imageContent">
                            <Link to={currentTvShowPath} alt={name} name={name}>
                                <img src={imageUrl} />
                            </Link>
                        </div>
                        <div className="info">
                            <RateComponent rateClass="tvShowRate"
                                           rating={tv.vote_average}
                            />
                            <p>{tv.original_name}({tv.name})</p>
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
            return this.renderTvShowsList();
        }
    }
}

export default TvShowsList;
