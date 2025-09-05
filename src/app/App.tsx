import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

import './App.css'

import AppBar from '../shared/ui-kit/AppBar.tsx'
import { useState } from 'react'
import Auth from '../entities/User/ui/Auth.tsx'
import type { UserType } from '../entities/User/model/userType.ts'
import Todos from '../entities/Todo/ui/Todos.tsx'
import { autoLogin } from '../shared/util /autoLogin.ts'

function App() {
	const userFromLS = autoLogin()
	const [user, setUser] = useState<UserType | null>(userFromLS)

	return (
		<>
			<AppBar username={user?.username} setUser={setUser} />

			<div style={{ marginTop: '100px' }} />

			{user ? <Todos /> : <Auth setUser={setUser} />}
		</>
	)
}

export default App
