import { AccountCircle, Visibility, VisibilityOff } from '@mui/icons-material'
import { Container, InputAdornment, Paper, Stack, TextField, ToggleButton, ToggleButtonGroup } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import LockIcon from '@mui/icons-material/Lock'
import { type Dispatch, type SetStateAction, type SyntheticEvent, useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import * as React from 'react'
import type { UserType } from '../model/userType.ts'

type AuthProps = {
	setUser: Dispatch<SetStateAction<UserType | null>>
}

const Auth = ({ setUser }: AuthProps) => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [loading, setLoading] = useState(false)
	const [loginFormName, setloginFormName] = useState('login')

	const handleClickShowPassword = () => setShowPassword((show) => !show)

	const handleUserNameChange = (e: SyntheticEvent<HTMLTextAreaElement | HTMLInputElement>) =>
		setUsername(e.currentTarget.value)

	const handlePasswordChange = (e: SyntheticEvent<HTMLTextAreaElement | HTMLInputElement>) =>
		setPassword(e.currentTarget.value)

	const handleLogin = async () => {
		setLoading(true)
		try {
			const loginResponse = await fetch('https://todos-be.vercel.app/auth/login', {
				method: 'POST',
				body: JSON.stringify({ username: username, password: password }),
				mode: 'cors',
				headers: { 'Content-Type': 'application/json' },
			})
			if (loginResponse.status === 200) {
				const loginData = (await loginResponse.json()) as { access_token: string; username: string }
				const accessToken = loginData.access_token
				console.log(jwtDecode(accessToken))

				localStorage.setItem('accessToken', accessToken)
				setLoading(false)
				setUser(loginData)
			} else if (loginResponse.status === 401) {
				alert('Invalid username or password')
				setLoading(false)
			}
		} catch (error) {
			alert(error)
			setLoading(false)
		}
	}

	const handleRegister = async () => {
		setLoading(true)
		try {
			const registerResponse = await fetch('https://todos-be.vercel.app/auth/register', {
				method: 'POST',
				body: JSON.stringify({ username: username, password: password }),
				mode: 'cors',
				headers: { 'Content-Type': 'application/json' },
			})

			if (registerResponse.status === 201) {
				alert('Sucсsefully registered')
				const loginResponse = await fetch('https://todos-be.vercel.app/auth/login', {
					method: 'POST',
					body: JSON.stringify({ username: username, password: password }),
					mode: 'cors',
					headers: { 'Content-Type': 'application/json' },
				})
				const loginData = (await loginResponse.json()) as { access_token: string; username: string }
				const accessToken = loginData.access_token
				console.log(jwtDecode(accessToken))

				localStorage.setItem('accessToken', accessToken)
				setLoading(false)
				setUser(loginData)
			} else if (registerResponse.status === 409) {
				alert('User already exists')
				setLoading(false)
			}
		} catch (error) {
			alert(error)
			setLoading(false)
		}
	}

	const handleChange = (_event: React.MouseEvent<HTMLElement>, newAlignment: string) => {
		setloginFormName(newAlignment)
	}

	const [showPassword, setShowPassword] = React.useState(false)

	const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault()
	}

	const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault()
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
				{loginFormName === 'login' ? (
					<Stack spacing={2}>
						<TextField
							disabled={loading}
							value={username}
							onChange={handleUserNameChange}
							size="medium"
							label="UserName"
							variant="filled"
							slotProps={{
								input: {
									startAdornment: (
										<InputAdornment position="start">
											<AccountCircle />
										</InputAdornment>
									),
								},
							}}
						/>
						<TextField
							disabled={loading}
							value={password}
							onChange={handlePasswordChange}
							size="medium"
							label="Password"
							type={showPassword ? 'text' : 'password'}
							variant="filled"
							slotProps={{
								input: {
									startAdornment: (
										<InputAdornment position="start">
											<LockIcon />
										</InputAdornment>
									),
									endAdornment: (
										<InputAdornment position="end">
											<IconButton
												aria-label={showPassword ? 'hide the password' : 'display the password'}
												onClick={handleClickShowPassword}
												onMouseDown={handleMouseDownPassword}
												onMouseUp={handleMouseUpPassword}
												edge="end"
											>
												{showPassword ? <VisibilityOff /> : <Visibility />}
											</IconButton>
										</InputAdornment>
									),
								},
							}}
						/>
						<Button
							onClick={handleLogin}
							variant={'contained'}
							loading={loading}
							loadingPosition={'start'}
							sx={{ backgroundColor: loginFormName === 'login' ? '#1976d2' : '#dc004e' }}
						>
							{loading ? 'Loading...' : 'Login'}
						</Button>
					</Stack>
				) : (
					<Stack spacing={2}>
						<TextField
							disabled={loading}
							value={username}
							onChange={handleUserNameChange}
							size="medium"
							label="UserName"
							variant="filled"
							slotProps={{
								input: {
									startAdornment: (
										<InputAdornment position="start">
											<AccountCircle />
										</InputAdornment>
									),
								},
							}}
						/>
						<TextField
							disabled={loading}
							value={password}
							onChange={handlePasswordChange}
							size="medium"
							label="Password"
							type={showPassword ? 'password' : 'text'}
							variant="filled"
							slotProps={{
								input: {
									startAdornment: (
										<InputAdornment position="start">
											<LockIcon />
										</InputAdornment>
									),
									endAdornment: (
										<InputAdornment position="end">
											<IconButton
												aria-label={showPassword ? 'hide the password' : 'display the password'}
												onClick={handleClickShowPassword}
												onMouseDown={handleMouseDownPassword}
												onMouseUp={handleMouseUpPassword}
												edge="end"
											>
												{showPassword ? <VisibilityOff /> : <Visibility />}
											</IconButton>
										</InputAdornment>
									),
								},
							}}
						/>
						<Button
							onClick={handleRegister}
							variant={'contained'}
							loading={loading}
							loadingPosition={'start'}
							sx={{ backgroundColor: loginFormName === 'login' ? '#1976d2' : '#dc004e' }}
						>
							{loading ? 'Loading...' : 'Register'}
						</Button>
					</Stack>
				)}
			</Paper>
		</Container>
	)
}

export default Auth
