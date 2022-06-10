import styled from "styled-components";
import { useState, useContext } from "react";
import { NavLink } from "react-router-dom";

import { DinoContext } from "../DinoContext";
import ChooseExhibit from "../littleComponents/ChooseExhibit";

const Nav = () => {

    const { user } = useContext(DinoContext);
    const [showMenu, setShowMenu] = useState(false);

    const openExhibitMenu = () => setShowMenu(true)
    const hideExhibitMenu = () => setShowMenu(false)

    return (
        <div>
            <NavBar>
                <NavLink strict to="/" activeClassName="active">Home</NavLink>
                <NavLink to="/population" activeClassName="active">Population</NavLink>
                <NavLink to="/logs" activeClassName="active">Logs</NavLink>
                <span onMouseEnter={openExhibitMenu} onMouseLeave={hideExhibitMenu}>Exhibit info
                    {
                        showMenu &&
                        <ChooseExhibit />
                    }
                </span>
                <NavLink to="/visitors" activeClassName="active">Visitors</NavLink>
                {
                    user.admin &&
                    <NavLink to="/employees" activeClassName="active">Staff roster</NavLink>
                }
            </NavBar>
            
        </div>
    )
}

const NavBar = styled.nav`
    align-items: center;
    background-color: var(--c-yellow);
    display: flex;
    justify-content: center;
    > * {
        color: var(--c-dark);
        cursor: pointer;
        padding: 20px;
    }
    .active {
        background-color: var(--c-gray);
        color: var(--c-light);
    }
    span {
        position: relative;
    }
`

export default Nav;