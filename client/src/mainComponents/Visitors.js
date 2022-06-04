import styled from "styled-components";
import { useEffect, useState } from "react";
import Spinner from "../littleComponents/Spinner";

const Visitors = () => {

    const [assets, setAssets] = useState([])
    const [value, setValue] = useState(0);

    useEffect(() => {
        fetch("/api/get-exhibits")
            .then(res => res.json())
            .then(data => setAssets(data.assets))
        .catch(err => console.log(err))
    }, [value])

    const turnOnOff = (id) => {
        console.log(id);
        fetch(`/api/toggle-visitor/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            // body: JSON.stringify({dinoName: item.species, currentNum: item.population})
        })
            .then(res => res.json())
            .then((data) => console.log(data))
            .then(() => setValue(value + 1))
    }

    console.log(assets);

    if (assets.length == 0) {
        return <Spinner />
    } else {

        let closedExhibits = 0;

        assets.map(element => {
            if (element.currentlyOpenToVisitors == false) {
                closedExhibits = closedExhibits + 1;
            }
        })
        console.log(closedExhibits);
        return (
            <Wrapper>
                {
                    closedExhibits == 0
                        ? <StatusOpen>All sectors operational</StatusOpen>
                        : <StatusOpen>Sectors closed: {closedExhibits}</StatusOpen>
                }
                <table>
                    <tbody>
                        {
                            assets.map((item, index) => {
                                return (
                                    <TableRow key={index}>
                                        <td>{item.name}</td>
                                        {
                                            item.currentlyOpenToVisitors
                                                ? <Online>Online</Online>
                                                : <Offline>Offline</Offline>
                                        }
                                        {
                                            item.currentlyOpenToVisitors
                                                ? <ToggleExhibit><button onClick={() => {turnOnOff(item._id)}}>Shut down</button></ToggleExhibit>
                                                : <ToggleExhibit><button onClick={() => {turnOnOff(item._id)}}>Reopen</button></ToggleExhibit>
                                        }
                                    </TableRow>
                                )
                                
                            })
                        }
                        </tbody>
                </table>
            </Wrapper>
        )
    }
    
}

const Wrapper = styled.main`
`

const StatusOpen = styled.div`
    background-color: var(--c-light);
    color: var(--c-dark);
    font-size: 30px;
    padding: 15px;
    text-align: center;
`

const TableRow = styled.tr`
    td {
        padding: 10px;
    }
`

const Online = styled.td`
    background-color: var(--c-blue);
    color: var(--c-light);
`

const Offline = styled.td`
    background-color: var(--c-red);
    color: var(--c-light);
`

const ToggleExhibit = styled.td`
    background-color: var(--c-dark);
    button {
        background-color: inherit;
        border: none;
        color: var(--c-light);
        cursor: pointer;
        height: 100%;
        width: 100%;
    }
    
`

export default Visitors;