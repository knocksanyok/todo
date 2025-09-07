import { AccountCircle, Visibility, VisibilityOff } from '@mui/icons-material'
import { Container, InputAdornment, Paper, Stack, TextField, ToggleButton, ToggleButtonGroup } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import LockIcon from '@mui/icons-material/Lock'
import { type SyntheticEvent, useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import * as React from 'react'
import type { UserType } from '../model/userType.ts'
import { rootApi } from '../../../shared/api/rootApi.ts'
import { useSnackbar } from 'notistack'
import type { AxiosError } from 'axios'
import { useUserStore } from '../model/store/useUserStore.ts'

const Auth = () => {
	const setUser = useUserStore((state) => state.setUser)

	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [loading, setLoading] = useState(false)
	const [loginFormName, setloginFormName] = useState('login')
	const { enqueueSnackbar } = useSnackbar()

	const handleClickShowPassword = () => setShowPassword((show) => !show)

	const handleUserNameChange = (e: SyntheticEvent<HTMLTextAreaElement | HTMLInputElement>) =>
		setUsername(e.currentTarget.value)

	const handlePasswordChange = (e: SyntheticEvent<HTMLTextAreaElement | HTMLInputElement>) =>
		setPassword(e.currentTarget.value)

	const handleLogin = async () => {
		setLoading(true)
		try {
			const loginData = await rootApi.post<UserType>('/auth/login', { username: username, password: password })

			const accessToken = loginData.data.access_token
			localStorage.setItem('accessToken', accessToken)
			console.warn(jwtDecode(accessToken))

			setUser(loginData.data)
			setLoading(false)
			enqueueSnackbar('Welcome', { variant: 'success' })
		} catch (error) {
			const axiousError = error as AxiosError<{ message: string }>
			enqueueSnackbar(axiousError.response?.data.message || 'Unknown error', { variant: 'error' })
			setLoading(false)
		} finally {
			setLoading(false)
		}
	}

	const handleRegister = async () => {
		setLoading(true)
		try {
			const registerData = await rootApi.post<UserType>('/auth/register', {
				username: username,
				password: password,
			})
			if (registerData.status === 201) {
				const loginData = await rootApi.post<UserType>('/auth/login', { username: username, password: password })

				const accessToken = loginData.data.access_token
				localStorage.setItem('accessToken', accessToken)
				console.warn(jwtDecode(accessToken))

				setUser(loginData.data)
				setLoading(false)
				enqueueSnackbar('Registration successful', { variant: 'success' })
			}
		} catch (error) {
			const axiousError = error as AxiosError<{ message: string }>
			enqueueSnackbar(axiousError.response?.data.message || 'Unknown error', { variant: 'error' })
			setLoading(false)
		} finally {
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
