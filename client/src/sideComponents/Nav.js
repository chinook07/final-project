import styled from "styled-components";
import { useState, useContext } from "react";
import { NavLink } from "react-router-dom";

import { DinoContext } from "../DinoContext";
import ChooseExhibit from "../littleComponents/ChooseExhibit";

const Nav = () => {

    // Get context and state needed for dropdown menu.

    const { user } = useContext(DinoContext);
    const [showMenu, setShowMenu] = useState(false);

    return (
        <div>
            <NavBar>
                <NavLink to="/" exact={true}>Home</NavLink>
                <NavLink to="/population">Population</NavLink>
                <NavLink to="/logs" >Logs</NavLink>
                <span onMouseEnter={() => setShowMenu(true)} onMouseLeave={() => setShowMenu(false)}>Habitat info
                    {
                        showMenu &&
                        <ChooseExhibit />
                    }
                </span>
                <NavLink to="/visitors">Visitors</NavLink>
                {
                    user.admin &&
                    <NavLink to="/employees">Staff roster</NavLink>
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
        &:hover {
            background-color: var(--c-light);
        }
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