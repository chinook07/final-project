import { useContext } from "react";
import styled from "styled-components";

import { DinoContext } from "../DinoContext";
import Spinner from "../littleComponents/Spinner";

const Logs = () => {

    const { assets, ready, update, setUpdate } = useContext(DinoContext);
    
    if (ready) {
        console.log(assets);

        const carnivores = [];
        assets.forEach((item, index) => {
            item.lastFeedings &&
            carnivores.push(item)
        })

        console.log(carnivores);

        const allVisits = assets.map((item, index) => {
            return item.lastVisits
        })

        console.log(allVisits);

        return (
            <>
                <main>
                    <h1>Logs</h1>
                    <ul>
                        {
                        carnivores.map((item, index) => {
                            return (
                                <li key={index}>
                                    The {item.species.toLowerCase()} were fed at:
                                    <span>
                                        <ol>
                                            {
                                                item.lastFeedings.map((feeding, index) => {
                                                    return (
                                                        <li key={index}>
                                                            {feeding.time}
                                                        </li>
                                                    )
                                                })
                                            }
                                        </ol>
                                    </span>
                                </li>
                                
                            )
                        })
                    }
                    </ul>

                    <br></br>

                    <ul>
                        {
                        assets.map((item, index) => {
                            return (
                                <li key={index}>
                                    The {item.species.toLowerCase()} were visited at:
                                    <span>
                                        <ol>
                                            {
                                                item.lastVisits.map((visit, index) => {
                                                    return (
                                                        <li key={index}>
                                                            {visit.time} by {visit.employee}
                                                        </li>
                                                    )
                                                })
                                            }
                                        </ol>
                                    </span>
                                </li>
                                
                            )
                        })
                    }
                    </ul>
                </main>
            </>
        )
    } else {
        return (
            <Spinner/>
        )
    }
    
}

const Wrapper = styled.div``

export default Logs;