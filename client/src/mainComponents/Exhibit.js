// The exhibit (or habitat) component gives the user a quick look at some basic info about each habitat.

import { useContext, useState } from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import { keyframes } from "styled-components";

import { DinoContext } from "../barebones/DinoContext";
import Spinner from "../littleComponents/Spinner";
import AreYouSure from "../littleComponents/AreYouSure";

// Create blinking animation for when the habitat perimeter is breached.

const blink = keyframes`
    from {opacity: 1};
    49% {opacity: 1};
    50% {opacity: 0};
    to {opacity: 0};
`

const Exhibit = () => {

    // Load context and state.

    const { user, assets, ready, update, setUpdate } = useContext(DinoContext);
    const [showReq, setShowReq] = useState(false);

    // Use params to get the right habitat info.

    const exhibitId = useParams().id;

    // Load our lovely spinner if things aren't ready.
    if (!ready) return <Spinner/>

    // Get the info about this exhibit.

    const { currentlyOpenToVisitors, dangerLevel, fenceActive, lastFeedings, lastVisits, name, population, species } = assets[exhibitId - 1];

    // Active perimeter using a patch request.

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
                        species={species}
                        closeForm={() => setShowReq(false)}
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
                    {
                        currentlyOpenToVisitors
                            ? <h1>Habitat {exhibitId} – Open</h1>
                            : <h1>Habitat {exhibitId} – Closed</h1>
                    }
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
                                    ? <button onClick={() => setShowReq(true)}>Disable perimeter</button>
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