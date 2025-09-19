import { useNavigate } from 'react-router'
import Button from '@mui/material/Button'

const About = ({ title, version, onClick }: { title: string; version: string; onClick: () => void }) => {
	// const navigate = useNavigate()
	return (
		<div style={{ backgroundColor: 'violet' }}>
			<h1>{title}</h1>
			<span>{version}</span>
			<Button
				onClick={() => {
					onClick()
				}}
			>
				Жмякай
			</Button>
			{/*<Button variant={'contained'} onClick={() => navigate(-1)}>*/}
			{/*	Go Back*/}
			{/*</Button>*/}
		</div>
	)
}

export default About
