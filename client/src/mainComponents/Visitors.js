import { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { DinoContext } from "../DinoContext";
import Spinner from "../littleComponents/Spinner";

const Visitors = () => {

    const { assets, ready, update, setUpdate } = useContext(DinoContext);

    const turnOnOff = (id) => {
        fetch(`/api/toggle-visitor/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        })
            .then(res => res.json())
            .then((data) => console.log(data))
            .then(() => setUpdate(update + 1))
    }

    console.log(assets);

    if (ready) {

        let closedExhibits = 0;

        assets.map(element => {
            if (element.currentlyOpenToVisitors === false) {
                closedExhibits = closedExhibits + 1;
            }
        })
        console.log(closedExhibits);
        return (
            <>
                {
                    closedExhibits === 0
                        ? <StatusOpen>All sectors operational</StatusOpen>
                        : <StatusOpen>Sectors closed: {closedExhibits}</StatusOpen>
                }
                <main>
                    
                    <table>
                        <tbody>
                            {
                                assets.map((item, index) => {
                                    return (
                                        <TableRow key={index}>
                                            <td><Link to={`/exhibit/${item._id}`}>{item.name}</Link></td>
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
                                            {
                                                item.fenceActive
                                                    ? <FenceTrue>Zone secure</FenceTrue>
                                                    : <FenceFalse>Zone breached</FenceFalse>
                                            }
                                        </TableRow>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </main>
            </>
        )
    } else {
        return <Spinner />
    }
    
}

const StatusOpen = styled.aside`
    background-color: var(--c-light);
    color: var(--c-dark);
`

const TableRow = styled.tr`
    td {
        padding: 10px;
        a {
            color: var(--c-light);
        }
    }
`

const Online = styled.td`
    background-color: var(--c-blue);
    border-radius: 5px 0 0 5px;
    color: var(--c-light);
`

const Offline = styled.td`
    background-color: var(--c-red);
    border-radius: 5px 0 0 5px;
    color: var(--c-light);
`

const ToggleExhibit = styled.td`
    background-color: var(--c-light);
    border-radius: 0 5px 5px 0;
    button {
        background-color: inherit;
        border: none;
        color: var(--c-dark);
        cursor: pointer;
        height: 100%;
        width: 100%;
    }   
`

const FenceTrue = styled.td`
    background-color: var(--c-gray);
`

const FenceFalse = styled.td`
    background-color: var(--c-red);
    text-transform: uppercase;
`

export default Visitors;