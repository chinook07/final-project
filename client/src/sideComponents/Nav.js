import styled from "styled-components";
import { useState, useContext } from "react";
import { NavLink } from "react-router-dom";

import { DinoContext } from "../DinoContext";
import ChooseExhibit from "../littleComponents/ChooseExhibit";

const Nav = () => {

    const { user } = useContext(DinoContext);
    const [showMenu, setShowMenu] = useState(false);

    const toggleExhibitMenu = () => {
        console.log("show");
        showMenu ? setShowMenu(false) : setShowMenu(true)
    }

    return (
        <div>
            <NavBar>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/population">Population</NavLink>
                <NavLink to="/logs">Logs</NavLink>
                <span onClick={toggleExhibitMenu}>Exhibit info</span>
                <NavLink to="/visitors">Visitors</NavLink>
                {
                    user.admin &&
                    <NavLink to="/employees">Staff roster</NavLink>
                }
            </NavBar>
            {
                showMenu &&
                <ChooseExhibit />
            }
        </div>
    )
}

const NavBar = styled.nav`
    align-items: center;
    background-color: var(--c-yellow);
    display: flex;
    height: 60px;
    justify-content: space-around;
    > * {
        color: var(--c-red);
        cursor: pointer;
    }
`

export default Nav;