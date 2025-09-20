import { AccountCircle, Visibility, VisibilityOff } from '@mui/icons-material'
import { Container, InputAdornment, Stack, TextField } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import LockIcon from '@mui/icons-material/Lock'
import { type SyntheticEvent, useEffect, useState } from 'react'
import * as React from 'react'
import { useSnackbar } from 'notistack'

import { useAppDispatch } from '../../../app/store.ts'
import { useNavigate } from 'react-router'
import { setUser } from '../../User/model/store/userStore.ts'
import { useLoginUserMutation, useRegisterUserMutation } from '../../User/api/userApi.ts'

const Register = () => {
	const navigate = useNavigate()
	const dispatch = useAppDispatch()

	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [showPassword, setShowPassword] = React.useState(false)
	const { enqueueSnackbar } = useSnackbar()

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

	const [loginUser, { data: dataLogin, isSuccess: isSuccessLogin }] = useLoginUserMutation()
	const [registerUser, { data: dataRegister, isSuccess: isSuccessRegister, isError, isLoading }] =
		useRegisterUserMutation()

	const handleRegister = () => {
		registerUser({ username: username, password: password })
	}

	useEffect(() => {
		if (isSuccessRegister && dataRegister) {
			loginUser({ username: username, password: password })
		}
	}, [isSuccessRegister, dataRegister])

	useEffect(() => {
		if (dataLogin?.access_token && isSuccessLogin) {
			localStorage.setItem('access_token', dataLogin.access_token)
			dispatch(setUser(dataLogin))
			enqueueSnackbar('Welcome', { variant: 'success' })
			navigate('/')
		}
	}, [dataLogin, isSuccessLogin])

	useEffect(() => {
		if (isError) {
			enqueueSnackbar('Registration failed', { variant: 'error' })
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
					loading={isLoading}
					loadingPosition={'start'}
					sx={{ backgroundColor: '#dc004e' }}
				>
					{isLoading ? 'Loading...' : 'Register'}
				</Button>
			</Stack>
		</Container>
	)
}

export default Register
