import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material'

const WelcomePage = () => {
    const navigate = useNavigate();
    const onStart = () => {
        navigate('quiz');
    }
    return (
        <>
            <div className="flex justify-center items-center h-screen flex-col gap-4">
                <h1 className="font-extrabold text-3xl">Welcome to Quiz App</h1>
                <Button variant="contained" className="normal-case" onClick={onStart}>Start</Button>
            </div>
        </>
    )
}

export default WelcomePage