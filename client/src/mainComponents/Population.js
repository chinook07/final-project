import styled from "styled-components";
import { useEffect, useState } from "react";
import Spinner from "../littleComponents/Spinner";

const Population = () => {

    const [assets, setAssets] = useState([])

    useEffect(() => {
        fetch("/api/get-exhibits")
            .then(res => res.json())
            .then(data => setAssets(data.assets))
        .catch(err => console.log(err))
    }, [])

    console.log(assets);

    if (assets.length == 0) {
        return <Spinner />
    } else {

        let countOfDinos = 0;
        assets.map(element => countOfDinos += element.population)

        return (
            <Wrapper>
                <TotalCount>Total count of assets: {countOfDinos}</TotalCount>
                <h1>Population</h1>
                <table>
                    {
                        assets.map(element => {
                            console.log(element.population);
                            return (
                                <tr>
                                    <td>{element.species}</td>
                                    <td>{element.population}</td>
                                    <td>
                                        <button>Birth</button>
                                        <button>Death</button>
                                    </td>
                                </tr>
                            )
                            
                        })
                    }
                </table>
            </Wrapper>
        )
    }


    
}

const Wrapper = styled.div``

const TotalCount = styled.div`
    background-color: var(--colour-light);
    color: var(--colour-yellow);
    font-size: 30px;
    padding: 15px;
    text-align: center;
`

export default Population;