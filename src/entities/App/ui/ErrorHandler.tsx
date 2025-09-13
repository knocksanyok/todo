import { Component, type PropsWithChildren } from 'react'
import Typography from '@mui/material/Typography'
import { NavLink } from 'react-router'
import Button from '@mui/material/Button'

class ErrorHandler extends Component<PropsWithChildren, { hasError: boolean }> {
	constructor(props: PropsWithChildren) {
		super(props)
		this.state = { hasError: false }
	}

	static getDerivedStateFromError() {
		return { hasError: true }
	}

	componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
		console.warn('Uncaught error:', error, errorInfo)
	}

	render() {
		if (this.state.hasError) {
			return (
				<>
					<Typography variant={'h1'}>Something went wrong</Typography>
					<Typography variant={'body1'}>Please try again later or contact support.</Typography>
					<NavLink to={'/'}>Back to the main page</NavLink>
					<Button
						variant={'contained'}
						onClick={() => {
							this.setState({ hasError: false })
							console.log('Change state')
						}}
					>
						Reset Error
					</Button>
				</>
			)
		}
		return this.props.children
	}
}

export default ErrorHandler
