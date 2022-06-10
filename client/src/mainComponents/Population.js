import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { DinoContext } from "../DinoContext";
import LogForm from "../littleComponents/LogForm";
import Spinner from "../littleComponents/Spinner";

const Population = () => {

    const [showForm, setShowForm] = useState(false);
    const [id, setId] = useState();
    const [whichForm, setWhichForm] = useState();

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
            .then(() => setUpdate(update + 1))
    }

    const feed = (item) => {
        setShowForm(true);
        setId(item._id);
        setWhichForm("feed");
    }

    const visit = (item) => {
        setShowForm(true);
        setId(item._id);
        setWhichForm("visit");
    }

    const closeForm = () => {
        setShowForm(false)
    }

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
                        <LogForm
                            id={id}
                            whichForm={whichForm}
                            closeForm={closeForm}
                        />
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
                                            <td><Link to={`/exhibit/${item._id}`}>{item.species}</Link></td>
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
                a {
                    color: var(--c-light);
                }
                button {
                    border: none;
                    cursor: pointer;
                    padding: 8px 10px;
                }
            }
        }
    }
`

const AddDino = styled.button`
    background-color: var(--c-blue);
    border-radius: 5px 0 0 5px;
    color: var(--c-light);
`

const RemoveDino = styled.button`
    background-color: var(--c-gray);
    border-radius: 0 5px 5px 0;
    color: var(--c-light);
`

const Visit = styled.button`
    background-color: var(--c-light);
    border-radius: 5px 0 0 5px;
    color: var(--c-dark);
`

const Feed = styled.button`
    background-color: var(--c-red);
    border-radius: 0 5px 5px 0;
    color: var(--c-light);
`

export default Population;