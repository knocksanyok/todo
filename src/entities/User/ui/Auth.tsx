import { Container, Paper, ToggleButton, ToggleButtonGroup } from '@mui/material'

import Button from '@mui/material/Button'
import { useState } from 'react'
import * as React from 'react'
import { selectIsLoading, selectUser, setUser } from '../model/store/userStore.ts'
import { useAppDispatch, useAppSelector } from '../../../app/store.ts'
import { Route, Routes, useNavigate } from 'react-router'
import { autoLogin } from '../../../shared/util /autoLogin.ts'

import Register from '../../App/ui/Register.tsx'
import Login from '../../App/ui/Login.tsx'

const Auth = () => {
	const [loginFormName, setloginFormName] = useState('login')
	const [error, setError] = useState(false)

	const user = useAppSelector(selectUser)!

	const navigate = useNavigate()
	const userFromLs = autoLogin()
	const dispatch = useAppDispatch()
	const loading = useAppSelector(selectIsLoading)

	const handleChange = (_event: React.MouseEvent<HTMLElement>, newAlignment: string) => {
		setloginFormName(newAlignment)
		navigate(`/auth/${newAlignment}`)
	}

	if (!user && userFromLs) {
		dispatch(setUser(userFromLs))
	}

	// Если включаю, то логика редиректа /profile ломается и всегда идет переброс на '/', ПОДУМАТЬ
	// if (user) {
	// 	return <Navigate to={'/'} />
	// }

	if (error) {
		throw new Error('Error')
	}

	return (
		<Container maxWidth={'sm'}>
			<Paper elevation={12} sx={{ padding: 3, paddingTop: '30px' }}>
				<ToggleButtonGroup
					disabled={loading}
					color="primary"
					value={loginFormName}
					exclusive
					onChange={handleChange}
					aria-label="Platform"
					fullWidth
					sx={{ marginBottom: 2 }}
					size={'small'}
				>
					<ToggleButton value="login">Login</ToggleButton>
					<ToggleButton value="register">Register</ToggleButton>
				</ToggleButtonGroup>
				<Button variant={'contained'} color={'error'} fullWidth onClick={() => setError(true)}>
					Error
				</Button>
				<Routes>
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
				</Routes>
			</Paper>
		</Container>
	)
}

export default Auth
