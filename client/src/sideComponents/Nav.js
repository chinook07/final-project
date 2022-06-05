import styled from "styled-components";
import { useState } from "react";
import { NavLink, useParams } from "react-router-dom";

import ChooseExhibit from "../littleComponents/ChooseExhibit";

const Nav = () => {

    const [showMenu, setShowMenu] = useState(false);

    const toggleExhibitMenu = () => {
        console.log("show");
        showMenu ? setShowMenu(false) : setShowMenu(true)
    }

    return (
        <Wrapper>
            <NavBar>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/population">Population</NavLink>
                <NavLink to="/logs">Logs</NavLink>
                <span onClick={toggleExhibitMenu}>Exhibit info</span> {/* will need to add params */}
                <NavLink to="/visitors">Visitors</NavLink>
            </NavBar>
            {
                showMenu &&
                <ChooseExhibit />
            }
        </Wrapper>
    )
}

const Wrapper = styled.div`
`

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