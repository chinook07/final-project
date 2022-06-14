import { useContext } from "react";
import { useHistory, NavLink } from "react-router-dom";
import styled from "styled-components";

import { DinoContext } from "../DinoContext";
import { ImExit } from "react-icons/im";

const Header = () => {

    // Get relevant user info from context.

    const { user, setUser, update, setUpdate } = useContext(DinoContext);

    // Log out and redirect to signin page.

    const history = useHistory();

    const LogOut = () => {
        localStorage.clear();
        setUser(null);
        setUpdate(update + 1);
        history.push("/")
    }

    // Fetch custom greeting according to time.

    const hour = new Date().getHours();
    let greeting;
    if (hour >= 3 && hour < 12) {
        greeting = "Good morning"
    } else if (hour >= 12 && hour < 18) {
        greeting = "Good afternoon"
    } else {
        greeting = "Good evening"
    }

    return (
        <Wrapper>
            <HomeLink to="/">Jurassic Park Control Console</HomeLink>
            {
                user !== null
                    ? <LogOutDiv>
                        <span>{greeting}, {user.username}</span>
                        <button onClick={LogOut}><ImExit size={20} fill="white"/></button>
                    </LogOutDiv>
                    : <div>Logged out</div>
            }            
        </Wrapper>
    )
}

const Wrapper = styled.header`
    align-items: center;
    background-color: var(--c-gray);
    color: var(--c-light);
    display: flex;
    height: 60px;
    justify-content: space-between;
    padding: 0 15px;
`

const HomeLink = styled(NavLink)`
    color: var(--c-light);
    font-size: large;
    font-weight: bold;
`

const LogOutDiv = styled.div`
    display: flex;
    button {
        background-color: inherit;
        border: none;
        cursor: pointer;
        margin-left: 10px;
    }
`

export default Header;