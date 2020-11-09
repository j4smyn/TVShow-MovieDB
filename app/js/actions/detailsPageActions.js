import axios from 'axios';
import {FETCHING_DATA, SET_PAGE, API_KEY} from './actions';

export function fetchingData(value) {
    return {
        type: FETCHING_DATA,
        payload: value
    };
}

export function getPageById(pageName, id) {
    return dispatch => {
        dispatch(fetchingData(true));
        let userLanguage = navigator.language;
        let url = `http://api.themoviedb.org/3/${pageName}/${id}?api_key=${API_KEY}`+
            `&language=${userLanguage}`;
        axios.get(url)
            .then((response) => {
                dispatch(setPage(response.data));
            })
            .catch((error) => {
                console.log(error);
            });
    }
}


export function setPage(page) {
    return function (dispatch) {
        dispatch({type: SET_PAGE, payload: page});
        dispatch(fetchingData(false));
    };
}