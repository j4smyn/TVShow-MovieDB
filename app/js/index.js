import '../scss/main.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, hashHistory, Redirect} from 'react-router';
import App from './containers/App';
import Movies from './containers/Movies/Movies';
import TvShows from './containers/TvShows/TvShows';
import DetailsPage from './containers/DeatilsPage';
import store from './store';
// import {NotFoundPage} from './components/notFoundPage';

const app = document.getElementById('app');

ReactDOM.render(
    <Provider store={store}>
        <Router history={hashHistory}>
            <Redirect from="/" to="/movie/1/popular" />
            <Route path="/" component={App}>
                <Route path="/movie/:page/:filter" component={Movies}/>
                <Route path="/:pageType/:id" component={DetailsPage}/>
                <Route path="/tv/:page/:filter" component={TvShows}/>
            </Route>
        </Router>
    </Provider>
    , app
);
