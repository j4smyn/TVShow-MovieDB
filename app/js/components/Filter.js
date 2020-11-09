import React, {Component} from 'react';

class Filter extends Component {
    constructor(props) {
        super(props);

        this.releaseDate = props.getReleaseDate();
        this.filters = [
            {name: 'High Popular', value: 'sort_by=popularity.desc'},
            {name: 'High Rated', value: 'sort_by=vote_average.desc'},
            {name: 'In Theaters', value: this.releaseDate},
        ];
    }

    handleChange(e) {
        const {setFilter} = this.props;
        const value = e.target.value;

        setFilter(value);
    }

    render() {
        const filters = this.filters.map((item, i) => {
            return(
                <option key={i} value={item.value}>{item.name}</option>
            );
        });

        return(
            <div className="form-group filterContainer">
                <label htmlFor="sel1">Filters:</label>
                <select defaultValue={this.filters[0].value}
                        onChange={this.handleChange.bind(this)}
                        className="form-control" id="sel1">
                    {filters}
                </select>
            </div>
        );
    }
}


export default Filter;