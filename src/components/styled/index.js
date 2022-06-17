import styled from 'styled-components';

export const QuestionNumber = styled.h2`
    color: ${({ theme }) => theme.colors.blue};

`
export const Title = styled.h2`
    text-align: center;
    font-size:${({ lg }) => lg ? '20px' : '18px'};
    ${({ theme }) => theme.sizes.md}{
        font-size:${({ lg }) => lg ? '28px' : '18px'};
    }
`
export const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 15px 15px;
`
export const Button = styled.button`
    text-transform: capitalize;
    margin: 10px;
    padding: 10px 20px;
    background: ${({ theme, disabled }) => disabled ? theme.colors.disabled : theme.colors.light_blue};
    color: ${({ theme, disabled }) => disabled ? theme.colors.disabled_text : '#fff'};
    border-radius: 20px;
    border:none;
    cursor: ${({ disabled }) => disabled ? 'auto' : 'pointer'};
    pointer-events:  ${({ disabled }) => disabled ? 'none' : 'auto'};
    transition: .3s ease;
    font-size: 18px;
    font-weight: 600;

    :hover{
        transform: ${({ disabled }) => disabled ? `scale(1)` : `scale(1.1)`};
    }
`