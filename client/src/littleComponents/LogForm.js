import styled from "styled-components"
import { useEffect, useState } from "react"

const LogForm = () => {

    const [allVets, setAllVets] = useState([]);

    useEffect(() => {
        fetch("/api/get-vets")
            .then(res => res.json())
            .then(data => setAllVets(data.result))
    }, [])

    return (
        <Wrapper>
            <p>Please supply the following info:</p>
            <fieldset>
                <Date>
                    <label htmlFor="inputDate">Date</label>
                    <input type="date" id="inputDate" name="logInfo"></input>
                </Date>
                <Time>
                    <label htmlFor="inputTime">Time</label>
                    <input type="time" id="inputTime" name="logInfo"></input>
                </Time>
                <Vet>
                    <label htmlFor="inputVet">By</label>
                    <select id="inputVet" name="logInfo">
                        {
                            allVets.map((item, index) => {
                                return (
                                    <option key={index}>{item.name}</option>
                                )
                            })
                        }
                    </select>
                </Vet>
                <button type="submit" value="submit">Submit</button>
            </fieldset>
        </Wrapper>
    )
}

const Wrapper = styled.form`
    background-color: var(--c-dark);
    border-radius: 10px;
    color: var(--c-light);
    left: 50%;
    padding: 15px;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    p {
        text-align: center;
    }
    fieldset {
        border: 1px solid var(--c-light);
        padding: 10px;
    }
`

const Date = styled.div``

const Time = styled.div``

const Vet = styled.div``

export default LogForm;