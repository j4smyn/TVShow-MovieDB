import React, {Component} from 'react';
import {Link} from 'react-router';

class Navigation extends Component {
    constructor(props) {
        super(props);
    }

    static handleClick() {
        window.scrollTo(0, 0);
    }

    render() {
        const {currentPage, totalPages, pageName, currentFilter} = this.props;
        let nextPage = `${pageName}/${currentPage+1}/${currentFilter}`;
        let prevPage = `${pageName}/${currentPage-1}/${currentFilter}`;
        let navigationText = `Currently on page: ${currentPage} of ${totalPages}`;
        let nextPageIcon = <Link to={nextPage}
                              className="glyphicon glyphicon-circle-arrow-right rightArrow"
                              onClick={Navigation.handleClick()}/>;
        let prevPageIcon = <Link to={prevPage}
                              className="glyphicon glyphicon-circle-arrow-left leftArrow"
                              onClick={Navigation.handleClick()}/>;

        return(
            <div className="navigationContainer">
                <p className="left">
                    {currentPage ? navigationText : null}
                </p>

                <p className="right">
                    {currentPage ? nextPageIcon : null}
                    {currentPage && currentPage !== 1 ? prevPageIcon : null}
                </p>
            </div>
        );
    }
}


export default Navigation;