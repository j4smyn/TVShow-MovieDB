import React, {Component} from 'react';
import {hashHistory, Link} from 'react-router';
import {connect} from 'react-redux';
import * as TvShowActions from '../../actions/tvShowActions';
import * as FilterModules from '../../modules/FilterModules';
import Navigation from '../../components/Navigation';
import Filter from '../../components/Filter';
import SearchField from '../../components/SearchField';
import TvShowsList from '../../components/TvShows/TvShowsList';

@connect((store) => {
    return {
        fetchingTvShows: store.tvShows.fetchingTvShows,
        data: store.tvShows.data
    }
})

class TvShows extends Component {
    constructor(props) {
        super(props);

        TvShows.setTvFilter = TvShows.setTvFilter.bind(this);
        this.getTvShows = this.getTvShows.bind(this);
        this.searchTvShowsByName = this.searchTvShowsByName.bind(this);
    }

    componentWillMount() {
        let {page, filter} = this.props.params;
        filter = FilterModules.nameToFilter(filter);

        this.getTvShows(page, filter);
    }

    componentWillReceiveProps(nextProps) {
        let propsPage = this.props.params.page;
        let nextPropsPage = nextProps.params.page;
        let propsFilter = this.props.params.filter;
        let nextPropsFilter = nextProps.params.filter;

        if (propsPage !== nextPropsPage || propsFilter !== nextPropsFilter) {
            let {page, filter} = nextProps.params;
            filter = FilterModules.nameToFilter(filter);
            this.getTvShows(page, filter);
        }
    }

    searchTvShowsByName(query) {
        TvShows.changeRoute(`/tv/1/search`);
        this.props.dispatch(TvShowActions.searchTvShowsByName(query));
    }

    static changeRoute(path) {
        hashHistory.push(path);
    }

    getTvShows(page, filter) {
        this.props.dispatch(TvShowActions.getTvShows(page, filter));
    }

    static setTvFilter(filter) {
        let filterName = FilterModules.filterToName(filter);
        TvShows.changeRoute(`/tv/1/${filterName}`)
    }

    static goToFirstPage() {
        TvShows.changeRoute(`/tv/1/popular`);
    }

    renderMoviesBlock() {
        const {data, fetchingTvShows} = this.props;
        const {filter} = this.props.params;

        return(
            <div className="tvShowsContainer">
                <SearchField fieldPlaceHolder="Search for a tv"
                             searchData={this.searchTvShowsByName}
                             goToFirstPage={TvShows.goToFirstPage}
                />
                <h2>Discover New Tv Shows</h2>
                <Filter setFilter={TvShows.setTvFilter}
                        getReleaseDate={FilterModules.getReleaseDate}
                />
                <TvShowsList data={data.results} fetchingMovies={fetchingTvShows} />
                <Navigation
                    currentPage={data.page}
                    currentFilter={filter}
                    totalPages={data.total_pages}
                    pageName="tv"
                />
            </div>
        );
    }

    render() {
        return this.renderMoviesBlock();
    }
}


export default TvShows;
