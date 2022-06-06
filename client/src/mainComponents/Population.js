import { useContext, useState } from "react";
import styled from "styled-components";

import { DinoContext } from "../DinoContext";
import LogForm from "../littleComponents/LogForm";
import Spinner from "../littleComponents/Spinner";

const Population = () => {

    const [showForm, setShowForm] = useState(false);
    const [id, setId] = useState();

    const { assets, ready, update, setUpdate } = useContext(DinoContext);

    const addDino = (item) => {
        fetch(`/api/birth-dino`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({species: item.species, currentNum: item.population})
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
            body: JSON.stringify({species: item.species, currentNum: item.population})
        })
            .then(res => res.json())
            .then((data) => console.log(data))
            .then(() => setUpdate(update + 1))
    }

    const feed = (item) => {
        console.log(item.lastFeedings[0]);
        setShowForm(true);
        setId(item._id);
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
                    {
                        showForm &&
                        <LogForm id={id} />
                    }
                    
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
                                                <Visit onClick={() => visit(item)}>Add visit time</Visit>
                                                {
                                                    item.lastFeedings &&
                                                    <Feed onClick={() => feed(item)}>Add feeding time</Feed>
                                                }
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