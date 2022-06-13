// Only high clearance staff has access to this page, allowing them to add and remove staff at will.

import { useContext, useEffect, useState } from "react";
import { parseISO, formatDistanceToNow } from "date-fns"
import styled from "styled-components";

import AddUserForm from "../littleComponents/AddUserForm";
import { HiOutlineUserRemove, HiOutlineUserAdd, HiUserCircle } from "react-icons/hi"
import Spinner from "../littleComponents/Spinner";
import { DinoContext } from "../DinoContext";

const Employees = () => {

    // Load context and states.

    const { user } = useContext(DinoContext);
    const [allStaff, setAllStaff] = useState([]);
    const [updateLocal, setUpdateLocal] = useState(0);
    const [showForm, setShowForm] = useState(false);

    // Upon load, and everytime the staff roster gets updated, fetch the info about all the staff.

    useEffect(() => {
        fetch("/api/get-employees")
            .then(res => res.json())
            .then(data => setAllStaff(data.staff))
            .catch(err => console.log(err))
    }, [updateLocal])

    // Handle the process for deleting a staff member from the list.

    const fireThem = (id) => {
        fetch(`/api/fire-employee/${id}`, {
            method: "DELETE",
            headers: {"Accept": "application/json"}
        })
            .then(res => res.json())
            .then(() => setUpdateLocal(updateLocal + 1))
            .catch(err => console.log(err))
    }

    // Handle closing the form when done hiring someone, or when cancelling. This function is sent as a prop to a child component.

    const exitForm = () => setShowForm(false)

    if (allStaff.length > 0) {

        // Reorder staff list, numerically by ID.

        let orderOfIds = [];
        allStaff.map(item => (
            orderOfIds.push(parseInt(item._id))
        ))
        orderOfIds.sort(function (a, b) { return a - b });
        
        // Get time of last login and calculate time difference with now

        // const nowTime = new Date();

        return (
            <>
                <Main>
                    <h1>JPM Access Profiles</h1>
                    <Table>
                        {
                            orderOfIds.map((item, index) => {
                                const result = allStaff.find(member => member._id == item);
                                return (
                                    <div key={index}>
                                        <User size={40}/>
                                        <Id>{result._id} {result.username}</Id>
                                        {
                                            result.lastLogIn &&
                                            <LastLogIn>
                                                {formatDistanceToNow(parseISO(result.lastLogIn), {addSuffix: true})}
                                            </LastLogIn>
                                        }
                                        {
                                            result._id !== user._id &&
                                            <Fire size={25} onClick={() => fireThem(result._id)} />
                                        }
                                        {
                                            result.admin &&
                                            <Admin><span>Clearance</span></Admin>
                                        }
                                    </div>
                                )
                            })
                        }
                        <div>
                            <AddUser size={50} onClick={() => setShowForm(true)} />
                        </div>
                    </Table>
                    {
                        showForm &&
                        <AddUserForm
                            exitForm={exitForm}
                            updateLocal={updateLocal}
                            setUpdateLocal={setUpdateLocal}
                        />
                    }
                </Main>
                
            </>
        )
    } else {
        return <Spinner/>
    }
    
}

const Main = styled.main`
    position: relative;
`

const Table = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    > div {
        align-content: space-between;
        border: 2px solid var(--c-gray);
        display: flex;
        flex-direction: column;
        min-height: 180px;
        padding: 30px 15px 15px;
        position: relative;
        text-align: center;
        width: 130px;
    }
    > div:nth-child(odd) {
        background-color: var(--c-blue);
    }
    > div:nth-child(even) {
        background-color: var(--c-yellow);
        color: var(--c-dark);
    }
    > div:last-child {
        cursor: pointer;
    }
`

const User = styled(HiUserCircle)`
    margin: 0 auto;
`

const Id = styled.div`
    margin-top: 10px;
`

const LastLogIn = styled.div`
    font-style: italic;
`

const Fire = styled(HiOutlineUserRemove)`
    cursor: pointer;
    margin: 20px auto 0;
`

const Admin = styled.div`
    border-bottom: 15px solid transparent;
    border-left: 15px solid var(--c-red);
    border-right: 15px solid transparent;
    border-top: 15px solid var(--c-red);
    height: 0;
    left: 0;
    position: absolute;
    top: 0;
    width: 0;
    span {
        display: none;
    }
    &:hover span {
        display: block;
        font-size: small;
    }
`

const AddUser = styled(HiOutlineUserAdd)`
    margin: auto;
`

export default Employees;