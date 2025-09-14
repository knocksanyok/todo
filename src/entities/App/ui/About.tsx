import { useNavigate } from 'react-router'
import Button from '@mui/material/Button'

const About = () => {
	const navigate = useNavigate()
	return (
		<div>
			<h1>About Us</h1>
			<span>Version 1.0.0</span>
			<Button variant={'contained'} onClick={() => navigate(-1)}>
				Go Back
			</Button>
		</div>
	)
}

export default About
