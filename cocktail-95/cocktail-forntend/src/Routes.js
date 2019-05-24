import React from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import Cocktails from "./containers/Cocktails/Cocktails";
import CocktailAdd from "./containers/CocktailAdd/CocktailAdd";


const ProtectedRoute = ({isAllowed, ...props}) => (
    isAllowed ? <Route {...props} /> : <Redirect to={"/"}/>
);

const Routes = ({user}) => {
    return (
        <Switch>
            <Route path="/" exact component={Cocktails}/>
            <ProtectedRoute isAllowed={user }
                            path="/cocktails/new" exact component={CocktailAdd}/>

        </Switch>
    );
};

export default Routes;