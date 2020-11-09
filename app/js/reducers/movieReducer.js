import {FETCHING_MOVIES, SET_MOVIES, SET_CURRENT_MOVIE} from '../actions/actions';

export default function reducer(state={
    data: [],
    currentMovie: null,
    fetchingMovies: false
}, action) {
    switch (action.type) {
        case FETCHING_MOVIES: {
            return {
                ...state,
                fetchingMovies: action.payload
            }
        }
        case SET_MOVIES: {
            return {
                ...state,
                data: action.payload
            }
        }
        case SET_CURRENT_MOVIE: {
            return {
                ...state,
                currentMovie: action.payload
            }
        }
    }

    return state;
}