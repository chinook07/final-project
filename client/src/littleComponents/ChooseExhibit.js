// This compoment is a dropdown menu belonging to the Habitat info link on the nav menu.

import { useContext } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

import { DinoContext } from "../barebones/DinoContext";

const ChooseExhibit = () => {

    // Import context.

    const { assets, ready } = useContext(DinoContext);

    if (ready) {
        return (
            <Wrapper>
                {
                    assets.map((element, index) => {
                        return (
                            <NavLink key={index} to={`/exhibit/${element._id}`}>
                                {element._id}: {element.name}
                            </NavLink>
                        )
                    })
                }
            </Wrapper>
        )
    }
}

const Wrapper = styled.div`
    
    left: 50%;
    position: absolute;
    top: 100%;
    transform: translateX(-50%);
    width: 190px;
    z-index: 1;
    a {
        background-color: var(--c-yellow);
        color: var(--c-dark);
        display: block;
        padding: 7px;
        &:hover {
            background-color: var(--c-light);
        }
        &.active {
            background-color: var(--c-gray);
            color: var(--c-light);
        }
        &:last-of-type {
            border-radius: 0 0 10px 10px;
        }
    }
`

export default ChooseExhibit;