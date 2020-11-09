import React, {Component} from 'react';


class RateComponent extends Component {
    constructor(props) {
        super(props);
    }

    static getRating(rating) {
        rating = Math.round(rating);

        if (rating === 0) {
            return <img className="starIcon" src="../../scss/images/emptyStar.svg" />;
        } else if (rating < 8) {
            return <img className="starIcon" src="../../scss/images/halfStar.svg" />;
        } else {
            return <img className="starIcon" src="../../scss/images/star.svg" />
        }
    }

    render() {
        const {rating, rateClass} = this.props;
        const star = RateComponent.getRating(rating);

        return(
            <div className={rateClass}>
                {star}
                <span>{rating}</span>
            </div>
        );
    }
}


export default RateComponent;