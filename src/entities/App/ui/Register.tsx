import { AccountCircle, Visibility, VisibilityOff } from '@mui/icons-material'
import { Container, InputAdornment, Stack, TextField } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import LockIcon from '@mui/icons-material/Lock'
import { type SyntheticEvent, useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import * as React from 'react'
import { rootApi } from '../../../shared/api/rootApi.ts'
import { useSnackbar } from 'notistack'
import type { AxiosError } from 'axios'
import { useAppDispatch, useAppSelector } from '../../../app/store.ts'
import { useNavigate } from 'react-router'
import { selectIsLoading, setIsLoading, setUser } from '../../User/model/store/userStore.ts'
import type { UserType } from '../../User/model/userType.ts'

const Register = () => {
	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const loading = useAppSelector(selectIsLoading)

	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [showPassword, setShowPassword] = React.useState(false)
	const { enqueueSnackbar } = useSnackbar()

	const handleClickShowPassword = () => setShowPassword((show) => !show)

	const handleUserNameChange = (e: SyntheticEvent<HTMLTextAreaElement | HTMLInputElement>) =>
		setUsername(e.currentTarget.value)

	const handlePasswordChange = (e: SyntheticEvent<HTMLTextAreaElement | HTMLInputElement>) =>
		setPassword(e.currentTarget.value)

	const handleRegister = async () => {
		dispatch(setIsLoading(true))
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

				dispatch(setUser(loginData.data))
				dispatch(setIsLoading(false))
				enqueueSnackbar('Registration successful', { variant: 'success' })
				navigate('/')
			}
		} catch (error) {
			const axiousError = error as AxiosError<{ message: string }>
			enqueueSnackbar(axiousError.response?.data.message || 'Unknown error', { variant: 'error' })
			dispatch(setIsLoading(false))
		} finally {
			dispatch(setIsLoading(false))
		}
	}

	const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault()
	}

	const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault()
	}

	return (
		<Container maxWidth={'sm'}>
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
					sx={{ backgroundColor: '#dc004e' }}
				>
					{loading ? 'Loading...' : 'Register'}
				</Button>
			</Stack>
		</Container>
	)
}

export default Register
