import React, {Component} from 'react';
import Header from '../components/Header';


class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div>
                <Header/>
                {this.props.children}
            </div>
        );
    }
}


export default App;
