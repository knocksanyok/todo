import { Component, type PropsWithChildren } from 'react'
import Typography from '@mui/material/Typography'
import { NavLink } from 'react-router'

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
				</>
			)
		}
		return this.props.children
	}
}

export default ErrorHandler
