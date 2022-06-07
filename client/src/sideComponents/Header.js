import { useContext } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import { DinoContext } from "../DinoContext";
import { ImExit } from "react-icons/im";

const Header = () => {

    const { user, setUser, update, setUpdate } = useContext(DinoContext);

    // Logging out

    const history = useHistory();

    const LogOut = () => {
        localStorage.clear();
        setUser(null);
        setUpdate(update + 1);
        history.push("/")
    }

    // Custom greeting

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
            <h1>Jurassic Park Management</h1>
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
    h1 {
        font-size: large;
    }
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