// This component tracks what is and what isn't open to the public. Also allows user to toggle opening of sectors.

import { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { DinoContext } from "../DinoContext";
import Spinner from "../littleComponents/Spinner";

const Visitors = () => {

    // Get all the info via the context file.

    const { assets, ready, update, setUpdate } = useContext(DinoContext);

    // Handle the toggle function.

    const turnOnOff = (id) => {
        fetch(`/api/toggle-visitor/${id}`, {
            method: "PATCH",
            headers: {"Accept": "application/json"}
        })
            .then(res => res.json())
            .then(() => setUpdate(update + 1))
    }

    if (ready) {

        // Tallies the number of closed sectors, if any.

        let closedExhibits = 0;

        assets.forEach(element => {
            if (element.currentlyOpenToVisitors === false) {
                closedExhibits = closedExhibits + 1;
            }
        })
        return (
            <>
                {
                    closedExhibits === 0
                        ? <StatusOpen>All sectors open to visitors</StatusOpen>
                        : <StatusOpen>Sectors closed: {closedExhibits}</StatusOpen>
                }
                <main>
                    <table>
                        <tbody>
                            {
                                assets.map((item, index) => {
                                    return (
                                        <TableRow key={index}>
                                            <td>
                                                <Link to={`/exhibit/${item._id}`}>{item.name}</Link>
                                            </td>
                                            {
                                                item.currentlyOpenToVisitors
                                                    ? <Online>Online</Online>
                                                    : <Offline>Offline</Offline>
                                            }
                                            {
                                                item.currentlyOpenToVisitors
                                                    ? <ToggleExhibit>
                                                        <button onClick={() => { turnOnOff(item._id) }}>Shut down</button>
                                                    </ToggleExhibit>
                                                    : <ToggleExhibit>
                                                        <button onClick={() => { turnOnOff(item._id) }}>Reopen</button>
                                                    </ToggleExhibit>
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