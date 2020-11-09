import React, {Component} from 'react';
import {hashHistory} from 'react-router';
import {connect} from 'react-redux';
import * as MovieActions from '../../actions/movieActions';
import * as FilterModules from '../../modules/FilterModules';
import Navigation from '../../components/Navigation';
import Filter from '../../components/Filter';
import SearchField from '../../components/SearchField';
import MoviesList from '../../components/Movies/MoviesList';

@connect((store) => {
  return {
      fetchingMovies: store.movies.fetchingMovies,
      data: store.movies.data
  }
})

class Movies extends Component {
    constructor(props) {
        super(props);

        Movies.setMovieFilter = Movies.setMovieFilter.bind(this);
        this.getMovies = this.getMovies.bind(this);
        this.searchMoviesByName = this.searchMoviesByName.bind(this);
    }

    componentWillMount() {
        let {page, filter} = this.props.params;
        filter = FilterModules.nameToFilter(filter);

        this.getMovies(page, filter);
    }

    componentWillReceiveProps(nextProps) {
        let propsPage = this.props.params.page;
        let nextPropsPage = nextProps.params.page;
        let propsFilter = this.props.params.filter;
        let nextPropsFilter = nextProps.params.filter;

        if (propsPage !== nextPropsPage || propsFilter !== nextPropsFilter) {
            let {page, filter} = nextProps.params;
            filter = FilterModules.nameToFilter(filter);

            this.getMovies(page, filter);
        }
    }

    searchMoviesByName(query) {
        Movies.changeRoute(`/movie/1/search`);
        this.props.dispatch(MovieActions.searchMoviesByName(query));
    }

    static changeRoute(path) {
        hashHistory.push(path);
    }

    getMovies(page, filter) {
        this.props.dispatch(MovieActions.getMovies(page, filter));
    }

    static setMovieFilter(filter) {
        let filterName = FilterModules.filterToName(filter);
        Movies.changeRoute(`/movie/1/${filterName}`)
    }

    static goToFirstPage() {
        Movies.changeRoute(`/movie/1/popular`);
    }

    renderMoviesBlock() {
        const {data, fetchingMovies} = this.props;
        const {filter} = this.props.params;

        return(
            <div className="moviesContainer">
                <SearchField fieldPlaceHolder="Search for a movie"
                             searchData={this.searchMoviesByName}
                             goToFirstPage={Movies.goToFirstPage}
                />
                <h2>Discover New Movies</h2>
                <Filter setFilter={Movies.setMovieFilter}
                        getReleaseDate={FilterModules.getReleaseDate}
                />
                <MoviesList data={data.results} fetchingMovies={fetchingMovies} />
                <Navigation
                    currentPage={data.page}
                    currentFilter={filter}
                    totalPages={data.total_pages}
                    pageName="movie"
                />
            </div>
        );
    }

    render() {
        return this.renderMoviesBlock();
    }
}


export default Movies;
