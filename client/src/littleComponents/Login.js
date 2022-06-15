// This component allows users to log in.

import styled from "styled-components";
import { useState, useContext } from "react";
import { DinoContext } from "../barebones/DinoContext";

const Login = () => {

    // Get the context and the states.

    const {setUser, update, setUpdate} = useContext(DinoContext)

    const [userNameEntered, setUserNameEntered] = useState("");
    const [passwordEntered, setPasswordEntered] = useState("");
    const [magicWord, setMagicWord] = useState(false);
    const [falseUser, setFalseUser] = useState(false);

    // Update states when user inputs info.

    const updateUN = (e) => setUserNameEntered(e.target.value);
    const updatePW = (e) => setPasswordEntered(e.target.value);

    // Handle login procedure.

    const handleLogIn = (e) => {
        e.preventDefault();
        fetch("/api/log-employee", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({user: userNameEntered, password: passwordEntered})
        })
            .then(res => res.json())
            .then(data => {
                if (data.status === 200) {
                    localStorage.setItem("user", JSON.stringify(data.result));
                    setUser(data.result);
                    setUpdate(update + 1);
                    setMagicWord(false);
                    setFalseUser(false);
                } else if (data.status === 401) {
                    setFalseUser(false);
                    setMagicWord(true);
                } else {
                    setFalseUser(true);
                    setMagicWord(false);
                }
            })
            .catch(err => console.log("error"))
    }

    return (
        <Wrapper>
            {
                magicWord &&
                    <ErrorAhAhAh src="images/magic-word.gif" />
            }
            
            <LogIn
                onSubmit={handleLogIn}
                name="login"
            >
                <fieldset>
                    <div>
                        <input
                            type="text"
                            placeholder="Username"
                            name="login"
                            required
                            value={userNameEntered}
                            onChange={updateUN}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            name="login"
                            required
                            value={passwordEntered}
                            onChange={updatePW}
                        />
                    </div>
                    {
                        falseUser &&
                            <UserNotRec>User non-existent.</UserNotRec>
                    }
                    
                    <button type="submit">Submit</button>
                </fieldset>
            </LogIn>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    background: url("./images/gates.jpg") center;
    min-height: calc(100vh - 120px);
    position: relative;
`

const ErrorAhAhAh = styled.img`
    display: block;
    margin: 0 auto;
`

const UserNotRec = styled.div`
    background-color: var(--c-red);
    border-radius: 5px;
    margin: 10px auto;
    padding: 5px;
    width: fit-content;
`

const LogIn = styled.form`
    left: 50%;
    position: absolute;
    top: 100%;
    transform: translate(-50%, -100%);
    fieldset {
        border: none;
        display: flex;
        flex-direction: column;
        > div {
            display: flex;
            justify-content: space-around;
            input {
                background-color: #f0b83eee;
                border-color: var(--c-gray);
                border-style: solid;
                border-width: 0 0 1px 1px;
                margin: 0 5px;
                padding: 8px;
                
            }
        }
        button {
            background-color: var(--c-dark);
            color: var(--c-light);
            cursor: pointer;
            margin: 5px auto;
            padding: 10px;
        }
    }
`

export default Login;