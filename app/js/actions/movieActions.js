import axios from 'axios';
import {FETCHING_MOVIES, SET_MOVIES, API_KEY} from './actions';

export function fetchingMovies(value) {
    return {
        type: FETCHING_MOVIES,
        payload: value
    };
}

export function getMovies(page, filter) {
    return dispatch => {
        dispatch(fetchingMovies(true));
        let userLanguage = navigator.language;
        let url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`+
                    `&page=${page}`+
                    `&language=${userLanguage}`+
                    `&${filter}`;
        axios.get(url)
            .then((response) => {
                dispatch(setMovies(response.data));
            })
            .catch((error) => {
                console.log(error);
            });
    }
}

export function setMovies(data) {
    return function (dispatch) {
        dispatch({type: SET_MOVIES,payload: data});
        dispatch(fetchingMovies(false));
    };
}

export function searchMoviesByName(query) {
    return dispatch => {
        let userLanguage = navigator.language;
        let url = `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}`+
            `&language=${userLanguage}`+
            `&query=${query}`;
        axios.get(url)
            .then((response) => {
                dispatch(sortMovies(response.data));
            })
            .catch((error) => {
                console.log(error);
            });
    }
}

export function sortMovies(response) {
    return dispatch => {
        let data = {results: []};
        for (let item of response.results) {
            // console.log(i);
            if (item.media_type === 'movie') {
                data.results.push(item);
            }
        }
        dispatch(setMovies(data));
    };
}