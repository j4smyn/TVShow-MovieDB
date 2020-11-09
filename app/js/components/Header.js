import React, {Component} from 'react';
import {Link} from 'react-router';
import {hashHistory} from 'react-router';

class Header extends Component {
    constructor(props) {
        super(props);

        this.tabs = [
            {label: 'Movies', path:'/movie/1/popular', name: 'movie'},
            {label: 'TV shows', path: '/tv/1/popular', name: 'tv'},
        ];
    }

    clickHandler(e) {
        let {target} = e;
        let activeLink = document.querySelector('.activeTab');

        if (activeLink) {
            activeLink.classList.remove('activeTab');
        }

        target.classList.add('activeTab');
    }

    render() {
        const path = hashHistory.getCurrentLocation().pathname;
        const tabs = this.tabs.map((item, i) => {
            let activeClass = path.includes(item.name) ? 'activeTab' : '';
            return(
                <li key={i} onClick={this.clickHandler}><Link className={activeClass} to={item.path}>{item.label}</Link></li>
            );
        });

        return(
            <nav className="header navbar navbar-default">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <a className="navbar-brand" href="#/">The Movie App</a>
                    </div>
                    <ul className="nav navbar-nav">
                        {tabs}
                    </ul>
                </div>
            </nav>
        );
    }
}


export default Header;