import { useContext } from "react";
import styled from "styled-components";

import { DinoContext } from "../DinoContext";
import VitalSigns from "./VitalsData";

const Vitals = () => {

    const { assets } = useContext(DinoContext);

    let allFencesActive = "active";
    assets.map(item => {
        if (item.fenceActive === false) {
            allFencesActive = "alert"
        }
    })

    let parkActive = "active";
    assets.map(item => {
        if (item.currentlyOpenToVisitors === false) {
            parkActive = "alert"
        }
    })

    return (
        <Wrapper>
            {
                VitalSigns.map((item, index) => {
                    if (index < 4) {
                        return (
                            <Sign key={index} className="alwaysOn">
                                <div>{item}</div>
                                <div>active</div>
                            </Sign>
                        )
                    }
                    if (index === 4) {
                        let signColour;
                        return (
                            <Sign
                                key={index}
                                signColour={
                                    allFencesActive === "active"
                                        ? signColour = "--c-blue"
                                        : signColour = "--c-red"
                                }
                            >
                                <div>{item}</div>
                                <div>{allFencesActive}</div>
                            </Sign>
                        )
                    }
                    if (index === 5) {
                        let signColour;
                        return (
                            <Sign
                                key={index}
                                signColour={
                                    parkActive === "active"
                                        ? signColour = "--c-blue"
                                        : signColour = "--c-red"
                                }
                            >
                                <div>{item}</div>
                                <div>{parkActive}</div>
                            </Sign>
                        )
                    }
                })
            }
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
    .alwaysOn {
        background-color: var(--c-blue);
    }
`

const Sign = styled.div`
    background-color: var(${props => props.signColour});
    border: 1px solid var(--c-dark);
    padding: 10px;
    text-align: center;
    width: calc(100% / 6);
    div:last-child {
        text-transform: uppercase;
    }
`

export default Vitals;