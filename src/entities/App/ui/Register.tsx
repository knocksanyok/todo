import { AccountCircle, Visibility, VisibilityOff } from '@mui/icons-material'
import { Container, InputAdornment, Stack, TextField } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import LockIcon from '@mui/icons-material/Lock'
import { useEffect } from 'react'
import * as React from 'react'
import { useSnackbar } from 'notistack'

import { useAppDispatch } from '../../../app/store.ts'
import { useNavigate } from 'react-router'
import { setUser } from '../../User/model/store/userStore.ts'
import { useLoginUserMutation, useRegisterUserMutation } from '../../User/api/userApi.ts'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import useErrorHandler from '../../../shared/hooks/useErrorHandler.ts'

const Register = () => {
	const navigate = useNavigate()
	const dispatch = useAppDispatch()

	const [showPassword, setShowPassword] = React.useState(false)
	const { enqueueSnackbar } = useSnackbar()

	const handleClickShowPassword = () => setShowPassword((show) => !show)

	const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault()
	}

	const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault()
	}

	const [loginUser, { data: dataLogin, isSuccess: isSuccessLogin }] = useLoginUserMutation()
	const [registerUser, { isError, isLoading, error }] = useRegisterUserMutation()

	const registerSchema = z.object({
		username: z.email({ message: 'Invalid email.' }),
		password: z
			.string()
			.min(3, { message: 'Password must be at least 3 characters long' })
			.max(10, { message: 'Password must be less than 10 characters' }),
	})

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({ resolver: zodResolver(registerSchema) })

	const onSubmit = async (data) => {
		await registerUser(data)
		loginUser(data)
	}

	useEffect(() => {
		if (dataLogin?.access_token && isSuccessLogin) {
			localStorage.setItem('access_token', dataLogin.access_token)
			dispatch(setUser(dataLogin))
			enqueueSnackbar('Welcome', { variant: 'success' })
			navigate('/')
		}
	}, [dataLogin, isSuccessLogin])

	useErrorHandler({ isError, error, defaultMessage: 'Login error occurred' })

	return (
		<Container maxWidth={'sm'}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Stack spacing={2}>
					<TextField
						disabled={isLoading}
						{...register('username')}
						error={!!errors.username}
						helperText={errors?.username?.message || ''}
						size="medium"
						label="Email"
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
						{...register('password')}
						error={!!errors.password}
						helperText={errors?.password?.message || ''}
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
						type="submit"
						variant={'contained'}
						loading={isLoading}
						loadingPosition={'start'}
						sx={{ backgroundColor: '#dc004e' }}
					>
						{isLoading ? 'Loading...' : 'Register'}
					</Button>
				</Stack>
			</form>
		</Container>
	)
}

export default Register
