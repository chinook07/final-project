import { useContext } from "react";
import { useParams } from "react-router";
import styled from "styled-components";

import { DinoContext } from "../DinoContext";

const Exhibit = () => {

    const { assets, ready, update, setUpdate } = useContext(DinoContext);

    const exhibitId = useParams().id;

    console.log(assets[exhibitId - 1]);

    const {currentlyOpenToVisitors, dangerLevel, fenceActive, lastFeedings, lastVisits, name, population, species} = assets[exhibitId - 1]

    if (ready) {
        return (
            <>
                {
                    dangerLevel === "high"
                        ? <Danger>Hazardous asset precautions necessary<div>Approach with caution or don't approach at all!</div></Danger>
                        : <NotDanger>Standard precautions required<div>Not a meat-eating specie</div></NotDanger>
                        
                }
                <main>
                    <h1>Exhibit {exhibitId}</h1>
                    <p>{name} currently has {population} living {species.toLowerCase()}.</p>
                </main>
                
            </>
        )
    }

    
}

const Danger = styled.aside`
    background-color: var(--c-red);
    color: var(--c-light);
    div {
        font-size: 15px;
    }
`

const NotDanger = styled.aside`
    background-color: var(--c-blue);
    color: var(--c-yellow);
    div {
        font-size: 15px;
    }
`

export default Exhibit;