import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

import './App.css'

import AppBar from '../shared/ui-kit/AppBar.tsx'
import Auth from '../entities/User/ui/Auth.tsx'
import Todos from '../entities/Todo/ui/Todos.tsx'
import { useUserStore } from '../entities/User/model/store/useUserStore.ts'

function App() {
	// const userFromLS = autoLogin()
	// const [user, setUser] = useState<UserType | null>(userFromLS)
	const user = useUserStore((state) => state.user)

	return (
		<>
			<AppBar />

			<div style={{ marginTop: '100px' }} />

			{user ? <Todos /> : <Auth />}
		</>
	)
}

export default App
