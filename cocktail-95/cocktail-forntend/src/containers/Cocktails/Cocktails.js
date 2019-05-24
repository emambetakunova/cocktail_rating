import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";

import {deleteCocktail, fetchCocktails, publishedCocktail} from "../../store/actions/cocktailActions";
import {CardColumns} from "reactstrap";
import {sendRating} from "../../store/actions/cocktailActions";
import Rating from "../../components/Rating/Rating";

class Cocktails extends Component {

    componentDidMount() {
        this.props.onFetchCocktails();
    }

    changePublishStatus = id => {
        this.props.publishedCocktail(id);
    };

    goDelete = id => {
        this.props.deleteCocktail(id);
    };

    changeRating = (newRating, cocktailId) => {
        console.log(newRating, cocktailId);
        this.props.sendRating(newRating, cocktailId );
    };

    render() {
        return (
            <Fragment>
                <h1>
                    Cocktails
                </h1>
                <CardColumns>
                    {this.props.cocktails.map(cocktail => (
                        <Rating
                            key={cocktail._id}
                            cocktail={cocktail}
                            changeRating={this.changeRating}
                            changePublishStatus={this.changePublishStatus}
                            goDelete={this.goDelete}
                        />
                    ))}
                </CardColumns>
            </Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        cocktails: state.cocktails.cocktails,
        user: state.users.user,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchCocktails: () => dispatch(fetchCocktails()),
        publishedCocktail: (id) => dispatch(publishedCocktail(id)),
        deleteCocktail: (id) => dispatch(deleteCocktail(id)),
        sendRating: (newRating, cocktailId) => dispatch(sendRating(newRating, cocktailId))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Cocktails);