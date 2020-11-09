import {FETCHING_TV_SHOWS, SET_TV_SHOWS, SET_CURRENT_TV_SHOW} from '../actions/actions';

export default function reducer(state={
    data: [],
    currentTvSHow: null,
    fetchingTvShows: false
}, action) {
    switch (action.type) {
        case FETCHING_TV_SHOWS: {
            return {
                ...state,
                fetchingTvShows: action.payload
            }
        }
        case SET_TV_SHOWS: {
            return {
                ...state,
                data: action.payload
            }
        }
        case SET_CURRENT_TV_SHOW: {
            return {
                ...state,
                currentTvSHow: action.payload
            }
        }
    }

    return state;
}