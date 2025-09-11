import { Route, Routes } from 'react-router'
import App from './App.tsx'
import About from '../entities/App/ui/About.tsx'
import NotFound from '../entities/App/ui/NotFound.tsx'
import Layout from '../entities/App/ui/Layout.tsx'
import Auth from '../entities/User/ui/Auth.tsx'
import Profile from '../entities/User/ui/Profile.tsx'
import Redirector from '../shared/util /Redirector.tsx'

const AppRoutes = () => {
	return (
		<div>
			<Routes>
				<Route element={<Layout />}>
					<Route element={<Redirector />}>
						<Route path="/" element={<App />} />
						<Route path="/profile" element={<Profile />} />
					</Route>
					<Route path="/auth/*" element={<Auth />} />
					<Route path="*" element={<NotFound />} />
					<Route path="/about" element={<About />} />
				</Route>
			</Routes>
		</div>
	)
}
export default AppRoutes
