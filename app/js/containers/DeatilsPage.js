import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as DetailsPageActions from '../actions/detailsPageActions';
import RateComponent from '../components/RateComponent';
import BackButton from '../components/BackButton';
import Loader from '../components/Loader';

@connect((store) => {
    return {
        page: store.detailsPage.page
    }
})

class CurrentMovie extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        const {pageType, id} = this.props.params;
        this.props.dispatch(DetailsPageActions.getPageById(pageType, id));
    }

    componentWillUnmount() {
        this.props.dispatch(DetailsPageActions.setPage(null));
    }

    static renderCurrentPageBlock(page) {
        let imageUrl = page.poster_path ?
            `http://image.tmdb.org/t/p/w300_and_h450_bestv2${page.poster_path}`
            : '../../scss/images/movie-placeholder.jpg';

        return(
            <div className="currentMovieContainer">
                <BackButton/>
                <div className="imageContainer">
                    <img src={imageUrl} />
                </div>
                <div className="movieContent">
                    <p><span>Title</span>: {page.title}</p>
                    <p><span>Original Title</span>: {page.title}</p>
                    <p><span>Overview</span>: {page.overview}</p>
                    <RateComponent rateClass="currentMovieRate" rating={page.vote_average} />
                </div>
            </div>
        );
    }


    render() {
        const {page} = this.props;
        if (page) {
            return CurrentMovie.renderCurrentPageBlock(page);
        } else {
            return  <Loader/>;
        }
    }
}


export default CurrentMovie;