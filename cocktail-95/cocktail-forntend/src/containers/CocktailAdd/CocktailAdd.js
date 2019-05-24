import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import {Form, FormGroup, Col, Button, Alert, Input, Label} from "reactstrap";


import FormElement from "../../components/UI/Form/FormElement";
import {sendCocktail} from "../../store/actions/cocktailActions";


class CocktailAdd extends Component {

    state = {
        title: '',
        recipe: '',
        image: '',
        ingredients: [{
            name: "",
            amount: "",
            // key: Math.random().toString()
        }]
    };

    componentDidMount() {
        if (!this.props.user) {
            this.props.history.push('/');
        }

    }

    inputChangeHandler = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };

    submitFormHandler = event => {
        event.preventDefault();
        const formData = new FormData();
        Object.keys(this.state).forEach(key => {
            formData.append(key, this.state[key]);
        });

        this.props.sendCocktail(formData);
    };

    fileChangeHandler = event => {
        this.setState({
            [event.target.name]: event.target.files[0]
        })

    };

    fieldHasError = fieldName => {
        return this.props.error && this.props.error.errors && this.props.error.errors[fieldName] && this.props.error.errors[fieldName].message;
    };

    addIngredient = () => {
        this.setState({
            ingredients: [
                ...this.state.ingredients,
                {name: '', amount: '',
                    // key: Math.random().toString()
                }
            ]
        })
    };

    ingredientInputChangeHandler = (event, index) => {
        const ingredient = {...this.state.ingredients[index]};
        ingredient[event.target.name] = event.target.value;
        const ingredients = [...this.state.ingredients];
        ingredients[index] = ingredient;

        this.setState({ingredients})
    };

    removeIngredient = index => {
        const ingredients = [...this.state.ingredients];
        ingredients.splice(index, 1);
        this.setState({ingredients})
    };

    render() {
        return (
            <Fragment>
                {this.props.error && this.props.error.global && (
                    <Alert color="danger">
                        Check the internet connection
                    </Alert>
                )}
                <Form onSubmit={this.submitFormHandler}>
                    <h2>Add new cocktail</h2>
                    <FormElement
                        propertyName="title"
                        title="Title"
                        type="text"
                        value={this.state.title}
                        onChange={this.inputChangeHandler}
                        error={this.fieldHasError('title')}
                        placeholder="Enter album title"
                    />
                    <FormElement
                        propertyName="image"
                        title="Image"
                        type="file"
                        onChange={this.fileChangeHandler}
                        error={this.fieldHasError('image')}
                    />
                    <FormElement
                        propertyName="recipe"
                        title="Recipe"
                        type="textarea"
                        value={this.state.recipe}
                        onChange={this.inputChangeHandler}
                        error={this.fieldHasError('recipe')}
                    />
                    <p>Ingredients: </p>
                    {this.state.ingredients.map((ing, index) => (
                        <FormGroup row key={index}>
                            <Col sm={6}>
                                <Label for="name">Name</Label>
                                <Input
                                    name="name"
                                    type="text"
                                    onChange={(event) => this.ingredientInputChangeHandler(event, index)}
                                />
                            </Col>
                            <Col sm={5}>
                                <Label for="amount">Amount</Label>
                                <Input
                                    name="amount"
                                    type="text"
                                    onChange={(event) => this.ingredientInputChangeHandler(event, index)}
                                />
                            </Col>
                            {index > 0 &&
                            <FormGroup className="mb-0 mt-2" row><Col sm={{size: 10}}/>
                                <Button className="ml-3"
                                        type="button"
                                        color="primary"
                                        onClick={() => this.removeIngredient(index)}>X</Button>
                            </FormGroup>}
                        </FormGroup>
                    ))}
                    <FormGroup row>
                        <Col sm={{offset: 2, size: 10}}/>
                        <Button className="mt-3 ml-3" type="button" color="primary" onClick={this.addIngredient}>Add
                            ingredient</Button>
                    </FormGroup>

                    <FormGroup row>
                        <Col sm={{offset: 2, size: 10}}/>
                        <Button className="ml-3" type="submit" color="primary">Create cocktail</Button>
                    </FormGroup>
                </Form>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    error: state.cocktails.error,
    user: state.users.user
});

const mapDispatchToProps = dispatch => ({
    sendCocktail: data => dispatch(sendCocktail(data))

});

export default connect(mapStateToProps, mapDispatchToProps)(CocktailAdd);