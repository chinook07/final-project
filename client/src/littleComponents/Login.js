import styled from "styled-components";
import { useState, useContext } from "react";
import { DinoContext } from "../DinoContext";

const Login = () => {

    const {user, setUser, update, setUpdate} = useContext(DinoContext)

    const [userNameEntered, setUserNameEntered] = useState("");
    const [passwordEntered, setPasswordEntered] = useState("");

    const updateUN = (e) => setUserNameEntered(e.target.value);
    const updatePW = (e) => setPasswordEntered(e.target.value);

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
                console.log(data.result);
                localStorage.setItem("user", JSON.stringify(data.result));
                setUser(data.result);
                setUpdate(update + 1);
            })
            .catch((err) => console.log("error", err))
    }

    if (true) {
        return (
            <LogIn
                onSubmit={handleLogIn}
                name="login"
            >
                <fieldset>
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
                    <button type="submit">Submit</button>
                </fieldset>
            </LogIn>
        )
    }
    
}

const LogIn = styled.form`
    left: 50%;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    fieldset {
        display: flex;
        flex-direction: column;
        input {
            background-color: var(--c-yellow);
            padding: 5px;
        }
        button {
            background-color: var(--c-dark);
            color: var(--c-light);
            padding: 5px;
        }
    }
`

export default Login;