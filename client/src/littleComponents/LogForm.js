import styled from "styled-components"
import { useEffect, useState, useContext } from "react"
import { format, compareAsc, parseISO } from 'date-fns';

import { DinoContext } from "../DinoContext";

const LogForm = ({ id, whichForm, closeForm }) => {

    // Load contexts and states.
    
    const { update, setUpdate } = useContext(DinoContext);

    const [dateEntered, setDateEntered] = useState("");
    const [timeEntered, setTimeEntered] = useState("");
    const [employeeEntered, setEmployeeEntered] = useState("");
    const [allVets, setAllVets] = useState([]);
    const [showDateWarning, setShowDateWarning] = useState(false);

    // Get list of vets.

    useEffect(() => {
        fetch("/api/get-vets")
            .then(res => res.json())
            .then(data => setAllVets(data.result))
    }, [])

    // Update states when user enters info in form.

    const updateDate = (e) => setDateEntered(e.target.value);
    const updateTime = (e) => setTimeEntered(e.target.value);
    const updateEmployee = (e) => setEmployeeEntered(e.target.value);

    // Handle sending of form, with an error validation to make sure user doesn't select a future date.

    const addLog = (e) => {
        e.preventDefault();
        const nowDate = format(new Date(), 'yyyy-MM-dd');
        const order = compareAsc(parseISO(nowDate), parseISO(dateEntered));
        if (order === -1) {
            setShowDateWarning(true)
            return
        }
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
                {
                    showDateWarning &&
                    <Warning>You have selected a future date. We can do a lot of miracles of Jurassic Park, but time travel is not one of them.</Warning>
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

const Warning = styled.div`
    color: var(--c-red);
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