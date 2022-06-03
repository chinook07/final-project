import styled from "styled-components";
import { useEffect, useState } from "react";

const Visitors = () => {

    const [state, setState] = useState([])

    useEffect(() => {
        fetch("/api/get-employees")
            .then(res => res.json())
            .then(data => setState(data))
        .catch(err => console.log(err))
    }, [])

    console.log(state);

    return (
        <Wrapper>
            <h1>Visitors</h1>
        </Wrapper>
    )
}

const Wrapper = styled.div``

export default Visitors;