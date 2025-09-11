import { Route, Routes } from 'react-router'
import App from './App.tsx'
import About from '../entities/App/ui/About.tsx'
import NotFound from '../entities/App/ui/NotFound.tsx'
import Layout from '../entities/App/ui/Layout.tsx'
import Auth from '../entities/User/ui/Auth.tsx'
import ProtectedRoute from '../entities/App/ui/ProtectedRoute.tsx'

const AppRoutes = () => {
	return (
		<div>
			<Routes>
				<Route element={<Layout />}>
					<Route path="/auth" element={<Auth />} />
					<Route
						path="/"
						element={
							<ProtectedRoute>
								<App />
							</ProtectedRoute>
						}
					/>
					<Route path="/about" element={<About />} />
					<Route path="*" element={<NotFound />} />
				</Route>
			</Routes>
		</div>
	)
}
export default AppRoutes
