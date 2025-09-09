import { Outlet } from 'react-router'
import AppBar from '../../../shared/ui-kit/AppBar.tsx'

const Layout = () => {
	return (
		<>
			<AppBar />
			<div style={{ marginTop: '100px' }}>
				<Outlet />
			</div>
		</>
	)
}

export default Layout
