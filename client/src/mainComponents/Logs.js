import { useContext, useState } from "react";
import styled from "styled-components";

import { DinoContext } from "../DinoContext";
import Spinner from "../littleComponents/Spinner";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";

const Logs = () => {

    const { assets, ready } = useContext(DinoContext);

    const [minShowF, setMinShowF] = useState(0);
    const [maxShowF, setMaxShowF] = useState(9);

    const [minShowV, setMinShowV] = useState(0);
    const [maxShowV, setMaxShowV] = useState(9);

    const showLaterF = () => {
        if (minShowF > 1) {
            setMinShowF(minShowF - 10)
            setMaxShowF(maxShowF - 10);
        }
    }

    const showEarlierF = (reOrderedFeedTimes) => {
        if (maxShowF < reOrderedFeedTimes.length + 1) {
            setMinShowF(minShowF + 10);
            setMaxShowF(maxShowF + 10)
        }
        
    }

    const showLaterV = () => {
        if (minShowV > 1) {
            setMinShowV(minShowV - 10);
            setMaxShowV(maxShowV - 10)
        }
    }

    const showEarlierV = (reOrderedVisitTimes) => {
        if (maxShowV < reOrderedVisitTimes.length + 1) {
            setMinShowV(minShowV + 10);
            setMaxShowV(maxShowV + 10)
        }
    }

    if (ready) {

        // Only the carnivores need to get fed. Find them.

        const carnivores = [];
        assets.forEach(item => {
            item.lastFeedings &&
            carnivores.push(item)
        })

        // Put them in order.

        const feedingTimesOrder = [];
        carnivores.map(dino => {
            dino.lastFeedings.map(feed => {
                feedingTimesOrder.push(feed.time)
            })
        })
        feedingTimesOrder.sort().reverse()

        let reOrderedFeedTimes = [];
        feedingTimesOrder.forEach((item) => {
            carnivores.forEach((dino) => {
                dino.lastFeedings.forEach((time) => {
                    if (time.time === item) {
                        reOrderedFeedTimes.push({time: time.time, species: dino.species})
                    }
                })
            })
        })

        // Now for the visiting times

        const visitTimesOrder = [];
        assets.map(dino => {
            dino.lastVisits.map(visit => {
                visitTimesOrder.push(visit.time)
            })
        })
        visitTimesOrder.sort().reverse()

        let reOrderedVisitTimes = [];
        visitTimesOrder.forEach((item) => {
            assets.forEach((dino) => {
                dino.lastVisits.forEach((time) => {
                    if (time.time === item) {
                        reOrderedVisitTimes.push({time: time.time, species: dino.species, employee: time.employee})
                    }
                })
            })
        })

        return (
            <>
                <Main>
                    <h1>Logs</h1>
                    <LogTree>
                        <h2>Last feeding times</h2>
                        <AiOutlineUp size={25} onClick={showLaterF}/>
                        {
                            reOrderedFeedTimes.map((item, index) => {
                                if (index >= minShowF && index <= maxShowF) {
                                    return (
                                        <Log key={index}>
                                            <div>{item.time}</div>
                                            <div>{item.species}</div>
                                        </Log>
                                    )
                                }
                                
                            })
                        }
                        <AiOutlineDown size={25} onClick={() => showEarlierF(reOrderedFeedTimes)}/>
                    </LogTree>
                    <LogTree>
                        <h2>Last visiting times</h2>
                        <AiOutlineUp size={25} onClick={showLaterV}/>
                        {
                            reOrderedVisitTimes.map((item, index) => {
                                if (index >= minShowV && index <= maxShowV) {
                                    return (
                                        <Log key={index}>
                                            <div>{item.time}</div>
                                            <div>{item.employee}</div>
                                            <div>{item.species}</div>
                                        </Log>
                                    )
                                }
                            })
                        }
                        <AiOutlineDown size={25} onClick={() => showEarlierV(reOrderedVisitTimes)}/>
                    </LogTree>
                </Main>
            </>
        )
    } else {
        return (
            <Spinner/>
        )
    }
    
}

const Main = styled.main``

const LogTree = styled.div`
    border: 1px solid var(--c-yellow);
    margin: 20px 20px 0;
    h2 {
        margin-bottom: 10px;
        text-align: center;
    }
    svg {
        cursor: pointer;
        display: block;
        margin: 10px auto;
    }
`

const Log = styled.div`
    background-color: var(--c-gray);
    display: flex;
    justify-content: space-around;
    margin-bottom: 10px;
    padding: 10px;
`

export default Logs;