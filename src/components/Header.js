import styled from "styled-components"

export default function Header() {
    return (
        <Header>
            <h1>Rock'n'Vinil</h1>
        </Header>
    )
}

const Header = styled.header`
    width: 100%;
    height: 140px;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
`