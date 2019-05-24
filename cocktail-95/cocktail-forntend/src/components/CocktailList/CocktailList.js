import React from 'react';
import CocktailThumbnail from "../CocktailThumbnail/CocktailThumbnail";
import {Card, CardBody} from "reactstrap";
import CardTitle from "reactstrap/es/CardTitle";
import Button from "reactstrap/es/Button";
import StarRatings from "react-star-ratings";

const CocktailList = props => {
    return (
        <Card className="mb-10">
            <CardBody>
                <p><strong>
                    {props.title}
                </strong></p>
                <CocktailThumbnail image={props.image}/>
                <p><strong>Recipe</strong> <br/>
                    {props.recipe}</p>
                <p><strong>Ingredients</strong></p>
                {props.ingredients.map(ingr => (
                    <p
                        key={ingr._id}>

                        <span>{ingr.name},</span>
                        <span> amount: {ingr.amount}</span>
                    </p>
                ))}
                {props.user && props.user.role === 'admin' ?
                    <CardBody>
                        <CardTitle>
                            <span><strong>Publish/Unpublish: </strong>
                                <input checked={props.cocktail.published}
                                       type="checkbox"
                                       onChange={() => props.published(props.cocktail._id)}/>
                            </span>
                        </CardTitle>
                        <CardTitle>
                            <Button type="submit" color="secondary" onClick={props.delete}>Delete</Button>
                        </CardTitle>
                    </CardBody> : null
                }
            </CardBody>
            <div style={{display: "flex", flexDirection: "column"}}>
                <div>
                    <StarRatings
                        starDimension={'20px'}
                        rating={props.rating}
                        starRatedColor="orange"
                        changeRating={props.changeRating}
                        numberOfStars={5}
                        name={props.name}
                    />
                    <div>
                        <p><strong>Number of votes: </strong>{props.rating}</p>
                        <p><strong>Average of votes: </strong>{props.ratingToShow}</p>
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default CocktailList;