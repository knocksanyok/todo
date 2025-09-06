import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

import './App.css'

import AppBar from '../shared/ui-kit/AppBar.tsx'
import Auth from '../entities/User/ui/Auth.tsx'
import Todos from '../entities/Todo/ui/Todos.tsx'
import { useUserStore } from '../entities/User/model/provider/userContext.tsx'

function App() {
	const { user } = useUserStore()

	return (
		<>
			<AppBar />

			<div style={{ marginTop: '100px' }} />

			{user ? <Todos /> : <Auth />}
		</>
	)
}

export default App
