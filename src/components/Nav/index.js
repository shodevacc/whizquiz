import React from 'react'
import styled from 'styled-components';

const Container = styled.nav`
    background: ${({ theme }) => theme.colors.blue}; 
    padding: 20px 10px;
    
  /* height: ; */
`;
const Title = styled.h1`
    font-size: 24px;
    margin:0;
    color: #fff;
    text-align:center;
    ${({ theme }) => theme.sizes.md}{
        font-size:32px;
    }
`
export default function Index() {
    return (
        <Container>
            <Title>WhizQuiz</Title>
        </Container>
    )
}
