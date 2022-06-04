import { useContext } from "react";
import styled from "styled-components";

import { DinoContext } from "../DinoContext";
import LogForm from "../littleComponents/LogForm";
import Spinner from "../littleComponents/Spinner";

const Population = () => {

    const { assets, ready, update, setUpdate } = useContext(DinoContext);

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
            .then(() => setUpdate(update + 1))
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
            .then(() => setUpdate(update + 1))
    }

    const feed = (item) => {
        console.log(item.lastFeedings[0]);
    }

    const visit = (item) => {
        console.log(item.lastVisits[0]);
    }

    console.log(assets);

    if (ready) {
        
        let countOfDinos = 0;
        assets.map(element => countOfDinos += element.population)

        return (
            <>
                <TotalCount>Total count of assets: {countOfDinos}</TotalCount>
                <main>
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
                </main>
                
            </>
        )
    } else {

        return <Spinner />

    }


    
}

const TotalCount = styled.aside`
    background-color: var(--c-blue);
    color: var(--c-yellow);
    font-size: 30px;
    margin: 0;
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