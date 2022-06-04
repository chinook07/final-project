import styled from "styled-components";
import { useEffect, useState } from "react";
import Spinner from "../littleComponents/Spinner";
import LogForm from "../littleComponents/LogForm";

const Population = () => {

    const [assets, setAssets] = useState([])
    const [value, setValue] = useState(0);

    useEffect(() => {
        fetch("/api/get-exhibits")
            .then(res => res.json())
            .then(data => setAssets(data.assets))
        .catch(err => console.log(err))
    }, [value])

    const addDino = (item) => {
        fetch(`/api/birth-dino`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({dinoName: item.species, currentNum: item.population})
        })
            .then(res => res.json())
            .then((data) => console.log(data))
            .then(() => setValue(value + 1))
    }

    const removeDino = (item) => {
        fetch(`/api/death-dino`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({dinoName: item.species, currentNum: item.population})
        })
            .then(res => res.json())
            .then((data) => console.log(data))
            .then(() => setValue(value + 1))
    }

    const feed = (item) => {
        console.log(item.lastFeedings[0]);
    }

    const visit = (item) => {
        console.log(item.lastVisits[0]);
    }

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
                <LogForm />
                <PopTable>
                    <thead>
                        <tr>
                            <th>Species</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            assets.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.species}</td>
                                        <td>{item.population}</td>
                                        <td>
                                            <AddDino onClick={() => addDino(item)}>Birth</AddDino>
                                            <RemoveDino onClick={() => removeDino(item)}>Death</RemoveDino>
                                        </td>
                                        <td>
                                            <Feed onClick={() => feed(item)}>Add feeding time</Feed>
                                            <Visit onClick={() => visit(item)}>Add visit time</Visit>
                                        </td>
                                    </tr>
                                )
                                
                            })
                        }
                    </tbody>
                </PopTable>
            </Wrapper>
        )
    }


    
}

const Wrapper = styled.main``

const TotalCount = styled.div`
    background-color: var(--c-light);
    color: var(--c-yellow);
    font-size: 30px;
    padding: 15px;
    text-align: center;
`

const PopTable = styled.table`
    tbody {
        tr {
            td {
                padding: 10px;
                button {
                    border: none;
                    color: var(--c-light);
                    cursor: pointer;
                    padding: 8px 10px;
                }
            }
        }
    }
`

const AddDino = styled.button`
    background-color: var(--c-blue);
`

const RemoveDino = styled.button`
    background-color: var(--c-dark);
`

const Feed = styled.button`
    background-color: var(--c-red);
`

const Visit = styled.button`
    background-color: var(--c-gray);
`

export default Population;