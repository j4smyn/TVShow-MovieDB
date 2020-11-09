import {FETCHING_DATA, SET_PAGE} from '../actions/actions';

export default function reducer(state={
    page: null,
    fetchingData: false
}, action) {
    switch (action.type) {
        case FETCHING_DATA: {
            return {
                ...state,
                fetchingData: action.payload
            }
        }
        case SET_PAGE: {
            return {
                ...state,
                page: action.payload
            }
        }
    }

    return state;
}
