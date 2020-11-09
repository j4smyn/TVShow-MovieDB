import { combineReducers } from 'redux';
import movieReducer from './movieReducer';
import tvShowReducer from './tvShowReducer';
import detailsPageReducer from './detailsPageReducer';


const appReducer = combineReducers({
    movies: movieReducer,
    tvShows: tvShowReducer,
    detailsPage: detailsPageReducer,
});


const rootReducer = (state, action) => {
    return appReducer(state, action)
};


export default rootReducer;