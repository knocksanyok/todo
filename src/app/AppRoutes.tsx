import { Route, Routes } from 'react-router'
import App from './App.tsx'
import About from '../entities/App/ui/About.tsx'
import NotFound from '../entities/App/ui/NotFound.tsx'
import Layout from '../entities/App/ui/Layout.tsx'

const AppRoutes = () => {
	return (
		<div>
			<Routes>
				<Route element={<Layout />}>
					<Route index element={<App />} />
					<Route path="/about" element={<About />} />
					<Route path="*" element={<NotFound />} />
				</Route>
			</Routes>
		</div>
	)
}

export default AppRoutes
