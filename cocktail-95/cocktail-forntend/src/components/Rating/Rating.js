import React, {Component} from 'react';
import CocktailList from "../CocktailList/CocktailList";
import {NotificationManager} from "react-notifications";

class Rating extends Component {

    render() {
        const {cocktail, user} = this.props;
        const ratingsNum = cocktail.ratings.length;
        let currentRatingObj;
        const sum = cocktail.ratings.reduce((acc, currentVal) => acc += currentVal.rating || 0, 0);
        let ratingToShow = sum / ratingsNum;
        let changeRatingFn = () => {
            NotificationManager.error('Please, log in to vote!')
        };

        if (user) {
            currentRatingObj = cocktail.ratings.reverse().find(rating => rating.userId === user._id);
            changeRatingFn = this.props.changeRating;
        }
        return (
                <CocktailList
                    user={user}
                    rating={user ? currentRatingObj.rating : ratingToShow}
                    ratingToShow={ratingToShow}
                    name={cocktail._id}
                    changeRating={this.props.changeRating}
                    title={cocktail.title}
                    image={cocktail.image}
                    recipe={cocktail.recipe}
                    cocktail={cocktail}
                    ingredients={cocktail.ingredients}
                    published={this.props.changePublishStatus}
                    delete={() => this.props.goDelete(cocktail._id)}
                />
        );
    }
}

export default Rating;