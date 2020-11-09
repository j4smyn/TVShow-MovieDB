import axios from 'axios';
import {FETCHING_TV_SHOWS, SET_TV_SHOWS, SET_CURRENT_TV_SHOW, API_KEY} from './actions';

export function fetchingTvShows(value) {
    return {
        type: FETCHING_TV_SHOWS,
        payload: value
    };
}

export function getTvShows(page, filter) {
    return dispatch => {
        dispatch(fetchingTvShows(true));
        let userLanguage = navigator.language;
        let url = `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}`+
            `&page=${page}`+
            `&language=${userLanguage}`+
            `&${filter}`;
        axios.get(url)
            .then((response) => {
                dispatch(setTvShows(response.data));
            })
            .catch((error) => {
                console.log(error);
            });
    }
}

export function setTvShows(data) {
    return function (dispatch) {
        dispatch({type: SET_TV_SHOWS,payload: data});
        dispatch(fetchingTvShows(false));
    };
}

export function setCurrentMovie(tv) {
    return {
        type: SET_CURRENT_TV_SHOW,
        payload: tv
    };
}


export function searchTvShowsByName(query) {
    return dispatch => {
        dispatch(fetchingTvShows(true));
        let userLanguage = navigator.language;
        let url = `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}`+
            `&language=${userLanguage}`+
            `&query=${query}`;
        axios.get(url)
            .then((response) => {
                dispatch(sortTvShows(response.data));
            })
            .catch((error) => {
                console.log(error);
            });
    }
}

export function sortTvShows(response) {
    return dispatch => {
        let data = {results: []};
        for (let item of response.results) {
            // console.log(i);
            if (item.media_type === 'tv') {
                data.results.push(item);
            }
        }
        dispatch(setTvShows(data));
    };
}