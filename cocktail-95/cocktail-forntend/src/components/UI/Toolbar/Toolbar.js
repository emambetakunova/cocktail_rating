import React from 'react';
import {
    Nav,
    Navbar,
    NavbarBrand,
    NavItem,
    NavLink
} from "reactstrap";
import {NavLink as RouterNavLink} from "react-router-dom";
import UserMenu from "./Menus/UserMenu";
import AnonimousMenu from "./Menus/AnonimousMenu";

const Toolbar = ({user, logout}) => {
    return (
        <Navbar color="light" light expand="md">
            <NavbarBrand tag={RouterNavLink} to="/">Happy recipes</NavbarBrand>
            <Nav className="ml-auto" navbar>
                <NavItem>
                    <NavLink tag={RouterNavLink} to="/" exact>Cocktails</NavLink>
                </NavItem>
                {user ? <UserMenu user={user} logout={logout}/> : <AnonimousMenu/>}
            </Nav>
        </Navbar>
    );
};

export default Toolbar;