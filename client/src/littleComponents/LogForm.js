import styled from "styled-components"
import { useEffect, useState, useContext } from "react"

import { DinoContext } from "../DinoContext";

const LogForm = ({ id, whichForm, closeForm }) => {
    
    const { update, setUpdate } = useContext(DinoContext);

    const [allVets, setAllVets] = useState([]);

    useEffect(() => {
        fetch("/api/get-vets")
            .then(res => res.json())
            .then(data => setAllVets(data.result))
    }, [])

    const [dateEntered, setDateEntered] = useState("");
    const [timeEntered, setTimeEntered] = useState("");
    const [employeeEntered, setEmployeeEntered] = useState("");

    const updateDate = (e) => setDateEntered(e.target.value);
    const updateTime = (e) => setTimeEntered(e.target.value);
    const updateEmployee = (e) => setEmployeeEntered(e.target.value);

    const addLog = (e) => {
        e.preventDefault();
        fetch(`/api/${whichForm}/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({time: `${dateEntered} ${timeEntered}`, employee: employeeEntered})
        })
            .then(res => res.json())
            .then(() => {
                closeForm()
                setUpdate(update + 1)
            })
    }

    console.log(id);

    return (
        <Wrapper onSubmit={addLog}>
            <p>Please supply the following info:</p>
            <fieldset>
                <InputDiv>
                    <label htmlFor="inputDate">Date</label>
                    <input
                        type="date"
                        id="inputDate"
                        name="logInfo"
                        value={dateEntered}
                        onChange={updateDate}
                        required
                    ></input>
                </InputDiv>
                <InputDiv>
                    <label htmlFor="inputTime">Time</label>
                    <input
                        type="time"
                        id="inputTime"
                        name="logInfo"
                        value={timeEntered}
                        onChange={updateTime}
                        required
                    ></input>
                </InputDiv>
                {
                    whichForm === "visit" &&
                        <InputDiv>
                        <label htmlFor="inputVet">By</label>
                        <select
                            id="inputVet"
                            name="logInfo"
                            value={employeeEntered}
                            onChange={updateEmployee}
                            required
                        >
                            {
                                allVets.map((item, index) => {
                                    return (
                                        <option key={index}>{item.name}</option>
                                    )
                                })
                            }
                        </select>
                    </InputDiv>
                }
                <ButtonCtrl>
                    <button type="button" value="cancel" onClick={closeForm}>Cancel</button>
                    <button type="submit" value="submit">Submit</button>
                </ButtonCtrl>
                
            </fieldset>
        </Wrapper>
    )
}

const Wrapper = styled.form`
    background-color: var(--c-gray);
    border-radius: 10px;
    color: var(--c-light);
    left: 50%;
    padding: 15px;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    p {
        margin-bottom: 10px;
        text-align: center;
    }
    fieldset {
        border: 1px solid var(--c-light);
        padding: 10px;
        div {
            display: flex;
            margin: 10px 0;
        }
    }
`

const InputDiv = styled.div`
    flex-direction: column;
    label {
        margin-bottom: 5px;
    }
    input, select {
        padding: 5px;
    }
`

const ButtonCtrl = styled.div`
    flex-direction: row;
    button {
        display: block;
        margin: 15px auto 0;
        padding: 5px;
    }
`

export default LogForm;