// This component displays the vitals in the top of the home page.

import { useContext } from "react";
import styled from "styled-components";

import { DinoContext } from "../DinoContext";
import VitalSigns from "./VitalsData";

const Vitals = () => {

    // Load the context.

    const { assets } = useContext(DinoContext);

    // The fences are all active by default. That said, loop through all of them to see if that's still the case.

    let allFencesActive = "active";
    assets.map(item => {
        if (item.fenceActive === false) allFencesActive = "alert"
    })

    // Same as above, with whether all sectors of the park are open.

    let parkActive = "active";
    assets.map(item => {
        if (item.currentlyOpenToVisitors === false) parkActive = "alert"
    })

    // Note that the first 4 items of the vitals screen are static and are not affected by what happens on the site. Only index 4 and 5 are dynamic.

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