import React from 'react'
import dayjs from 'dayjs';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;
const Title = styled.div`
    font-size:36px;
`
const addPadding = (val) => {
    const length = val.length
    return length === 1 ? `0${val}` : (val)
}

export default function TimeLeft() {
    const getTimeRemaining = React.useCallback(() => {
        var today = dayjs()
        const date = (dayjs().hour(0).minute(0).second(0)).add(1,'day')
        const timeLeft = date.diff(today)
        const hours_float = timeLeft / (1000 * 60 * 60)
        const hours = parseInt(hours_float)
        const mins_float = (hours_float - hours) * 60
        const mins = parseInt(mins_float)
        // const seconds = (mins_float - mins) * 60
        const seconds = `${parseInt((mins_float - mins) * 60)}`.slice(0, 2)
        return `${addPadding(`${hours}`)}:${addPadding(`${mins}`)}:${addPadding(seconds)}`
    }, [])
    const [time, setTime] = React.useState("")

    React.useEffect(() => {
        const Interval = setInterval(() => {
            setTime(getTimeRemaining())
        }, 1000)

        return () => {
            clearInterval(Interval)
        }
    }
        , [])
    // console.log("time", time)
    return (
        <Container>
            <h2 className='smallTitle'>Time Left</h2>
            <Title>{time}</Title>
        </Container>
    )
}
