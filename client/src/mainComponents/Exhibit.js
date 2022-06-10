import { useContext, useState } from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import { keyframes } from "styled-components";

import { DinoContext } from "../DinoContext";
import Spinner from "../littleComponents/Spinner";
import AreYouSure from "../littleComponents/AreYouSure";

const blink = keyframes`
    from {opacity: 1};
    49% {opacity: 1};
    50% {opacity: 0};
    to {opacity: 0};
`

const Exhibit = () => {

    const { user, assets, ready, update, setUpdate } = useContext(DinoContext);

    const [showReq, setShowReq] = useState(false);

    const closeForm = () => setShowReq(false);

    const exhibitId = useParams().id;
    if (!ready) {
        return <Spinner/>
    }
    const { currentlyOpenToVisitors, dangerLevel, fenceActive, lastFeedings, lastVisits, name, population, species } = assets[exhibitId - 1];

    const needConfirm = () => {
        setShowReq(true);
    }

    const enablePeri = () => {
        fetch(`/api/toggle-fence/${exhibitId}`, {
            method: "PATCH",
        })
            .then(res => res.json())
            .then(() => setUpdate(update + 1))
    }

    if (ready) {
        return (
            <>
                {
                    showReq &&
                    <AreYouSure
                        exhibitId={exhibitId}
                        closeForm={closeForm}
                    />
                }
                {
                    dangerLevel === "high"
                        ? <Danger>Hazardous asset precautions necessary<div>Approach with caution or don't approach at all!</div></Danger>
                        : <NotDanger>Standard precautions required<div>Not a meat-eating specie</div></NotDanger>
                        
                }
                <main>
                    {
                        fenceActive
                            ? <AllNormal>Perimeter active. Assets contained.</AllNormal>
                            : <Breach>Perimeter breach – possible out of containment.</Breach>
                    }
                    <h1>Exhibit {exhibitId}</h1>
                    <p>{name} currently has {population} living {species.toLowerCase()}.</p>
                    <p>Last visited at {lastVisits[0].time} by {lastVisits[0].employee}.</p>
                    {
                        lastFeedings &&
                        <p>Last fed at {lastFeedings[0].time} by our drones.</p>
                    }
                    {
                        user.admin &&
                        <FenceControl>
                            {
                                fenceActive
                                    ? <button onClick={needConfirm}>Disable perimeter</button>
                                    : <button onClick={enablePeri}>Activate perimeter</button>
                            }
                        </FenceControl>
                    }
                    
                </main>
                
            </>
        )
    } 

    
}

const Danger = styled.aside`
    background-color: var(--c-dark);
    color: var(--c-light);
    div {
        font-size: 15px;
    }
`

const NotDanger = styled.aside`
    background-color: var(--c-gray);
    color: var(--c-yellow);
    div {
        font-size: 15px;
    }
`

const AllNormal = styled.aside`
    background-color: var(--c-blue);
    color: var(--c-light);
`

const Breach = styled.aside`
    animation: ${blink} 2s linear infinite;
    background-color: var(--c-red);
    color: var(--c-light);
`

const FenceControl = styled.div`
    button {
        background-color: var(--c-light);
        border: none;
        border-radius: 5px;
        cursor: pointer;
        display: block;
        font-size: 18px;
        margin: auto;
        padding: 8px 10px;
        &:hover {
            transform: scale(1.05);
        }
    }
`

export default Exhibit;