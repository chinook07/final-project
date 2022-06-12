// This component allows users to log in.

import styled from "styled-components";
import { useState, useContext } from "react";
import { DinoContext } from "../DinoContext";

const Login = () => {

    // Get the context and the states.

    const {setUser, update, setUpdate} = useContext(DinoContext)

    const [userNameEntered, setUserNameEntered] = useState("");
    const [passwordEntered, setPasswordEntered] = useState("");

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
                localStorage.setItem("user", JSON.stringify(data.result));
                setUser(data.result);
                setUpdate(update + 1);
            })
            .catch((err) => console.log("error", err))
    }

    return (
        <Wrapper>
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
                    
                    <button type="submit">Submit</button>
                </fieldset>
            </LogIn>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    background: url("/images/gates.jpg") center;
    min-height: calc(100vh - 120px);
    position: relative;
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
            margin: 5px auto;
            padding: 10px;
            
        }
    }
`

export default Login;