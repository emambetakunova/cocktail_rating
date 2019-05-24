import React, {Fragment} from 'react';
import {NavItem} from "reactstrap";

import FacebookLogin from "../../../FacebookLogin/FacebookLogin";

const AnonymousMenu = () => (
    <Fragment>
        <NavItem>
            <FacebookLogin/>
        </NavItem>
    </Fragment>
);

export default AnonymousMenu;