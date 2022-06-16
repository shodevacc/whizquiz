import React from 'react'
import Confetti from 'react-confetti'

export default function ConfettiComponent() {
    const [dimensions, setDimensions] = React.useState({ height: window.innerHeight, width: window.innerWidth })
    React.useEffect(() => {
        const handleResize = () => {
            setDimensions(
                { height: window.innerHeight, width: window.innerWidth }
            )
        }
        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])
    return (
        <Confetti height={dimensions.height} width={dimensions.width} />
    )
}
