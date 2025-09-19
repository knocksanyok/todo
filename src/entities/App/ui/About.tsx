import Button from '@mui/material/Button'
import { useState } from 'react'

const About = () => {
	// const navigate = useNavigate()
	const [count, setCount] = useState(0)
	return (
		<div>
			<h1>About Us</h1>
			<span data-testid="version-container">Version 1.0.0</span>
			{/*<Button variant={'contained'} onClick={() => navigate(-1)}>*/}
			{/*	Go Back*/}
			{/*</Button>*/}
			<Button
				onClick={() => {
					setCount((count) => count + 1)
				}}
				data-testid="increment-button"
			>
				Click
			</Button>
			<span data-testid="counter">{count}</span>
		</div>
	)
}

export default About
