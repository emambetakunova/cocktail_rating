import axios from "../../axios-api";
import {push} from "connected-react-router";
import {NotificationManager} from 'react-notifications';

export const FETCH_COCKTAILS_SUCCESS = 'FETCH_COCKTAILS_SUCCESS';
export const FETCH_COCKTAILS_FAILURE = "FETCH_COCKTAILS_FAILURE";

export const SEND_COCKTAILS_SUCCESS = 'SEND_COCKTAILS_SUCCESS';
export const SEND_COCKTAILS_FAILURE = "SEND_COCKTAILS_FAILURE";

export const PUBLISH_COCKTAIL_SUCCESS = 'PUBLISH_COCKTAIL_SUCCESS';

export const DELETE_COCKTAIL_SUCCESS = "DELETE_COCKTAIL_SUCCESS";
export const DELETE_COCKTAIL_FAILURE = "DELETE_COCKTAIL_FAILURE";

export const SEND_RATING_SUCCESS = 'SEND_RATING_SUCCESS';

export const fetchCocktailsSuccess = data => {
    return {type: FETCH_COCKTAILS_SUCCESS, data};
};

const fetchCocktailsFailure = error => ({type: FETCH_COCKTAILS_FAILURE, error});

const sendCocktailSuccess = () => ({type: SEND_COCKTAILS_SUCCESS});
const sendCocktailFailure = error => ({type: SEND_COCKTAILS_FAILURE, error});

const publishedCocktailSuccess = (cocktail) => ({type: PUBLISH_COCKTAIL_SUCCESS, cocktail});

const deleteCocktailSuccess = () => ({type: DELETE_COCKTAIL_SUCCESS});
const deleteCocktailFailure = () => ({type: DELETE_COCKTAIL_FAILURE});

const sendRatingSuccess = (cocktail) => ({type: SEND_RATING_SUCCESS, cocktail});

export const fetchCocktails = () => {
    return dispatch => {
        return axios.get('/cocktails').then(
            response => dispatch(fetchCocktailsSuccess(response.data)),
            error => dispatch(fetchCocktailsFailure(error))
        );
    };
};


export const sendCocktail = data => {
    return dispatch => {
        return axios.post('/cocktails', data).then(
            () => {
                dispatch(sendCocktailSuccess());
                NotificationManager.success('Created successfully');
                dispatch(push('/'));
            },
            error => {
                if (error.response && error.response.data) {
                    dispatch(sendCocktailFailure(error.response.data));
                } else {
                    dispatch(sendCocktailFailure({global: 'No connection'}))
                }

            }
        )
    }
};

export const publishedCocktail = id => {
    return dispatch => {
        return axios.post('/cocktails/' + id + '/toggle_published').then(
            (result) => dispatch(publishedCocktailSuccess(result.data))
        );
    };
};

export const deleteCocktail = id => {
    return (dispatch, getState) => {
        let token = getState().users.user.token;
        const header = {headers: {'Authorization': token}};
        return axios.delete('/cocktails/' + id, header).then(
            () => {
                dispatch(deleteCocktailSuccess());
                dispatch(fetchCocktails());
            },
            error => {
                if(error.response  && error.response.data){
                    dispatch(deleteCocktailFailure(error.response.data));
                } else {
                    dispatch(deleteCocktailFailure({global: 'No connection'}))
                }
            }
        );
    };
};

export const sendRating = (newRating, cocktailId) => {
    return dispatch => {
        return axios.post('/cocktails/' + cocktailId + '/rating', {newRating: newRating}).then(
            (result) => {
                console.log(result.data);
                dispatch(sendRatingSuccess(result.data))
            }
        );
    };
};