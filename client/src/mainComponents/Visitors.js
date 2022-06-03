import styled from "styled-components";
import { useEffect, useState } from "react";
import Spinner from "../littleComponents/Spinner";

const Visitors = () => {

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

        let allOpen = true;

        assets.map(element => {
            if (element.currentlyOpenToVistors == false) {
                allOpen = false;
                return
            }
        })
        console.log(allOpen);
        return (
            <Wrapper>
                {
                    allOpen == true &&
                    <StatusOpen>All sectors are operational</StatusOpen>
                }
                {/* <h1>What's open {assets[0].species}</h1> */}
                {
                    assets.map(element => {
                        <TableRow>{element.species}</TableRow>
                    })
                }
            </Wrapper>
        )
    }
    
}

const Wrapper = styled.div`
`

const StatusOpen = styled.div`
    background-color: var(--colour-light);
`

const TableRow = styled.div``

export default Visitors;