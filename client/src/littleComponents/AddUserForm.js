import styled from "styled-components";
import { useState } from "react";

const AddUserForm = (exitForm, updateLocal, setUpdateLocal) => {

    const [idEntered, setIdEntered] = useState("");
    const [UserEntered, setUserEntered] = useState("");
    const [PassEntered, setPassEntered] = useState("");
    const [AdminEntered, setAdminEntered] = useState(false);

    const updateId = (e) => setIdEntered(e.target.value);
    const updateUser = (e) => setUserEntered(e.target.value);
    const updatePass = (e) => setPassEntered(e.target.value);
    const updateAdmin = (e) => setAdminEntered(e.target.checked);

    const addEmployee = (e) => {
        e.preventDefault();
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
            <p>Please fill the following info:</p>
            <fieldset>
                <div>
                    <label htmlFor="id">Id</label>
                    <input
                        type="number"
                        id="id"
                        name="newUser"
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
                <button type="submit" value="submit">Hire</button>
            </fieldset>
        </Wrapper>
    )
}

const Wrapper = styled.form`
    background-color: var(--c-dark);
    left: 50%;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    p {
        margin-bottom: 10px;
        text-align: center;
    }
    fieldset {
        border-color: var(--c-yellow);
        padding: 10px;
        > div {
            display: flex;
            justify-content: space-between;
            margin: 15px;
            label {
                margin-right: 10px;
            }
        }
        button {
            background-color: var(--c-light);
            border: none;
            border-radius: 5px;
            display: block;
            margin: 10px auto;
            padding: 10px 15px;
        }
    }
`

export default AddUserForm;