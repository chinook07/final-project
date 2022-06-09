import { useContext, useEffect, useState } from "react";
import styled from "styled-components";

import AddUserForm from "../littleComponents/AddUserForm";
import { HiOutlineUserRemove, HiOutlineUserAdd, HiUserCircle } from "react-icons/hi"
import { DinoContext } from "../DinoContext";

const Employees = () => {

    const { user } = useContext(DinoContext)
    console.log(user);

    const [allStaff, setAllStaff] = useState([]);
    const [updateLocal, setUpdateLocal] = useState(0);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        fetch("/api/get-employees")
            .then(res => res.json())
            .then(data => {
                console.log(data.staff)
                setAllStaff(data.staff)
            })
            .catch(err => console.log(err))
    }, [updateLocal])

    const fireThem = (id) => {
        fetch(`/api/fire-employee/${id}`, {
            method: "DELETE",
            headers: {"Accept": "application/json"}
        })
            .then(res => res.json())
            .then(() => setUpdateLocal(updateLocal + 1))
            .catch(err => console.log(err))
    }

    const hireMember = () => {
        console.log("hire");
        setShowForm(true)
    }

    const exitForm = () => {
        setShowForm(false)
    };

    if (allStaff.length > 0) {

        let orderOfIds = [];
        allStaff.map(item => {
            orderOfIds.push(parseInt(item._id))
        })
        orderOfIds.sort(function(a, b){return a-b});

        return (
            <>
                <main>
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
                                            result.password.length < 9 &&
                                            <Pass>Password insecure</Pass>
                                        }
                                        {
                                            result._id !== user._id &&
                                            <Fire size={25} onClick={() => fireThem(result._id)} />
                                        }
                                        {
                                            result.admin &&
                                            <Admin><span>Admin</span></Admin>
                                        }
                                    </div>
                                )
                            })
                        }
                        <div>
                            <AddUser size={50} onClick={hireMember} />
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
                </main>
                
            </>
        )
    } else {
        return <h1>Load...</h1>
    }
    
}

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

const Pass = styled.div`
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
    }
`

const AddUser = styled(HiOutlineUserAdd)`
    margin: auto;
`

export default Employees;