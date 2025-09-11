import { Outlet } from 'react-router'
import AppBar from '../../../shared/ui-kit/AppBar.tsx'
import ErrorHandler from './ErrorHandler.tsx'

const Layout = () => {
	return (
		<>
			<AppBar />
			<div style={{ marginTop: '100px' }}>
				<ErrorHandler>
					<Outlet />
				</ErrorHandler>
			</div>
		</>
	)
}

export default Layout
