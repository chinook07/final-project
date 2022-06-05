import { useContext } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

import { DinoContext } from "../DinoContext";

const ChooseExhibit = () => {

    const { assets, ready, update, setUpdate } = useContext(DinoContext);

    if (ready) {
        return (
            <Wrapper>
                {
                    assets.map((element, index) => {
                        return (
                            <li key={index}>
                                <NavLink to={`/exhibit/${element._id}`}>
                                    {element._id}: {element.name}
                                </NavLink>
                            </li>
                        )
                    })
                }
            </Wrapper>
        )
    }

    
}

const Wrapper = styled.ul`
    left: 70%;
    position: absolute;
    transform: translateX(-50%);
    width: fit-content;
    li {
        list-style-type: none;
        opacity: 0.8;
        padding: 5px;
        &:hover {
            opacity: 1;
        }
        
        a {
            color: var(--c-light);
        }
    }
    li:nth-child(odd) {
        background-color: var(--c-dark);
        
    }
    li:nth-child(even) {
        background-color: var(--c-gray);
    }
`

export default ChooseExhibit;