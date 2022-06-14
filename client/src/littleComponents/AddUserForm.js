// This component allows the user to add a new user to the database.

import styled from "styled-components";
import { useState } from "react";
import { CommonPasswords, Numbers } from "./Password";

const AddUserForm = ({ exitForm, updateLocal, setUpdateLocal }) => {
    
    // Get the states needed.

    const [idEntered, setIdEntered] = useState("");
    const [UserEntered, setUserEntered] = useState("");
    const [PassEntered, setPassEntered] = useState("");
    const [AdminEntered, setAdminEntered] = useState(false);
    const [showWarningId, setShowWarningId] = useState(false);
    const [showWarningPass, setShowWarningPass] = useState(false);

    // Update states when user enters info in form.

    const updateId = (e) => setIdEntered(e.target.value);
    const updateUser = (e) => setUserEntered(e.target.value);
    const updatePass = (e) => setPassEntered(e.target.value);
    const updateAdmin = (e) => setAdminEntered(e.target.checked);

    // Handle adding the employee, with some error validation for id and password.

    const addEmployee = (e) => {
        e.preventDefault();
        if (idEntered.length !== 3) {
            if (PassEntered.length >= 8 && PassEntered.length <= 16) setShowWarningPass(false)
            setShowWarningId(true);
            return
        }
        if (PassEntered.length < 8 || PassEntered.length > 16) {
            setShowWarningId(false);
            setShowWarningPass(true);
            return
        }
        if (CommonPasswords.includes(PassEntered)) {
            setShowWarningId(false);
            setShowWarningPass(true);
            return
        }
        let digitPresent = false;
        Numbers.forEach(digit => {
            if (PassEntered.includes(digit)) {
                digitPresent = true;
                return
            }
        })
        if (!digitPresent) {
            setShowWarningId(false);
            setShowWarningPass(true);
            return
        }
        if (PassEntered === UserEntered) {
            setShowWarningId(false);
            setShowWarningPass(true);
            return
        }
        fetch(`/api/hire-employee`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                _id: idEntered,
                username: UserEntered,
                password: PassEntered,
                admin: AdminEntered
            })
        })
            .then(res => res.json())
            .then(() => {
                exitForm()
                setUpdateLocal(updateLocal + 1)
            })
    }

    return (
        <Wrapper onSubmit={addEmployee}>
            <FormTitle>Please fill the following info:</FormTitle>
            <fieldset>
                <div>
                    <label htmlFor="id">Id</label>
                    <input
                        type="number"
                        id="id"
                        name="newUser"
                        pattern="[0-9]{3}"
                        maxLength="3"
                        value={idEntered}
                        onChange={updateId}
                        required
                    ></input>
                </div>
                <div>
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="newUser"
                        value={UserEntered}
                        onChange={updateUser}
                        required
                    ></input>
                </div>
                <div>
                    <label htmlFor="pass">Temp. password</label>
                    <input
                        type="password"
                        id="pass"
                        name="newUser"
                        value={PassEntered}
                        onChange={updatePass}
                        required
                    ></input>
                </div>
                <div>
                    <label htmlFor="admin">Admin</label>
                    <input
                        type="checkbox"
                        id="admin"
                        name="newUser"
                        value={AdminEntered}
                        onChange={updateAdmin}
                    ></input>
                </div>
                {
                    showWarningId &&
                        <Warning>The ID must match JP ISO 5415-62 norms and be 3 digits in length.</Warning>
                }
                {
                    showWarningPass &&
                        <Warning>
                            <p>Jurassic Park takes cybersecurity seriously. Password requirements:</p>
                            <ul>
                                <li>Must be between 8 and 16 characters in length</li>
                                <li>Must contain at least 1 digit</li>
                                <li>Cannot be a frequently chosen password</li>
                                <li>Cannot be the same as the username</li>
                            </ul>
                        </Warning>
                }
                <div>
                    <button type="button" value="cancel" onClick={exitForm}>Cancel</button>
                    <button type="submit" value="submit">Hire</button>
                </div>
            </fieldset>
        </Wrapper>
    )
}

const Wrapper = styled.form`
    background-color: var(--c-gray);
    border-radius: 5px;
    left: 50%;
    position: absolute;
    top: 80%;
    transform: translate(-50%, -80%);
    fieldset {
        border-color: var(--c-dark);
        padding: 10px;
        > div {
            display: flex;
            justify-content: space-between;
            margin: 15px;
            button {
                background-color: var(--c-light);
                border: none;
                border-radius: 5px;
                cursor: pointer;
                display: block;
                margin: 10px auto;
                padding: 10px 15px;
            }
            label {
                margin-right: 10px;
            }
        }
        
    }
`

const FormTitle = styled.p`
    margin-bottom: 10px;
    text-align: center;
`

const Warning = styled.div`
    color: var(--c-red);
    flex-direction: column;
    ul {
        list-style-position: inside;
        margin-top: 5px;
    }
`

export default AddUserForm;