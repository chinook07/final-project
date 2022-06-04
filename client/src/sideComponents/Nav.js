import styled from "styled-components";
import { NavLink, useParams } from "react-router-dom";

const Nav = () => {


    return (
        <Wrapper>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/population">Population</NavLink>
            <NavLink to="/logs">Logs</NavLink>
            <NavLink to="/exhibit/">Exhibit info</NavLink> {/* will need to add params */}
            <NavLink to="/visitors">Visitors</NavLink>
        </Wrapper>
    )
}

const Wrapper = styled.nav`
    align-items: center;
    background-color: var(--c-yellow);
    display: flex;
    height: 60px;
    justify-content: space-around;
    a {
        color: var(--c-red);
    }
`

export default Nav;