import { AccountCircle, Visibility, VisibilityOff } from '@mui/icons-material'
import { Container, InputAdornment, Stack, TextField } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import LockIcon from '@mui/icons-material/Lock'
import { type SyntheticEvent, useEffect, useState } from 'react'
import * as React from 'react'

import { useSnackbar } from 'notistack'

import { useAppDispatch } from '../../../app/store.ts'
import { useLocation, useNavigate } from 'react-router'
import { setUser } from '../../User/model/store/userStore.ts'
import { useLoginUserMutation } from '../../User/api/userApi.ts'

const Login = () => {
	const navigate = useNavigate()
	const dispatch = useAppDispatch()

	const [showPassword, setShowPassword] = React.useState(false)
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	const { enqueueSnackbar } = useSnackbar()
	const previousLocation = useLocation().state

	const handleClickShowPassword = () => setShowPassword((show) => !show)

	const handleUserNameChange = (e: SyntheticEvent<HTMLTextAreaElement | HTMLInputElement>) =>
		setUsername(e.currentTarget.value)

	const handlePasswordChange = (e: SyntheticEvent<HTMLTextAreaElement | HTMLInputElement>) =>
		setPassword(e.currentTarget.value)

	const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault()
	}

	const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault()
	}

	const [loginUser, { data, isLoading, isError }] = useLoginUserMutation()

	const handleLogin = () => {
		loginUser({ username: username, password: password })
	}

	useEffect(() => {
		if (data?.access_token) {
			localStorage.setItem('access_token', data.access_token)
			dispatch(setUser(data))
			enqueueSnackbar('Welcome', { variant: 'success' })
			const backPath = previousLocation?.back || '/'
			navigate(backPath)
		}
	}, [data])

	useEffect(() => {
		if (isError) {
			enqueueSnackbar('Login failed', { variant: 'error' })
		}
	}, [isError])

	return (
		<Container maxWidth={'sm'}>
			<Stack spacing={2}>
				<TextField
					disabled={isLoading}
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
					disabled={isLoading}
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
					loading={isLoading}
					loadingPosition={'start'}
					sx={{ backgroundColor: '#1976d2' }}
				>
					{isLoading ? 'Loading...' : 'Login'}
				</Button>
			</Stack>
		</Container>
	)
}
export default Login
