import React, {Component} from 'react';


class SearchField extends Component {
    constructor(props) {
        super(props);

        this.timer = null;
        this.clearField = this.clearField.bind(this);
    }

    static handleKeyUp(e) {
        const {searchData} = this.props;
        let value = e.target.value;

        if (this.timer) clearTimeout(this.timer);

        this.timer = setTimeout(() => {
            value = value.split(' ').join('+');
            searchData(value);
        }, 500);
    };

    clearField() {
        const {goToFirstPage} = this.props;
        const {searchField} = this.refs;

        searchField.value = '';
        goToFirstPage();
    }

    render() {
        const {fieldPlaceHolder} = this.props;
        let closeIcon = <span onClick={this.clearField} className="glyphicon glyphicon-remove clearIcon" />;

        return(
            <form className="searchFieldContainer">
                <div className="form-group">
                    <input type="text"
                           className="form-control searchField"
                           id="exampleInputEmail1"
                           aria-describedby="emailHelp"
                           placeholder={fieldPlaceHolder}
                           onKeyUp={SearchField.handleKeyUp.bind(this)}
                           ref="searchField"
                    />
                    {closeIcon}
                </div>
            </form>
        );
    }
}




export default SearchField;