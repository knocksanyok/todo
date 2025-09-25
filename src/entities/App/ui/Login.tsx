import { AccountCircle, Visibility, VisibilityOff } from '@mui/icons-material'
import { Container, InputAdornment, Stack, TextField } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import LockIcon from '@mui/icons-material/Lock'
import { useEffect } from 'react'
import * as React from 'react'

import { useSnackbar } from 'notistack'

import { useAppDispatch } from '../../../app/store.ts'
import { useLocation, useNavigate } from 'react-router'
import { setUser } from '../../User/model/store/userStore.ts'
import { useLoginUserMutation } from '../../User/api/userApi.ts'
import { object, string } from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import useErrorHandler from '../../../shared/hooks/useErrorHandler.ts'

const Login = () => {
	const navigate = useNavigate()
	const dispatch = useAppDispatch()

	const [showPassword, setShowPassword] = React.useState(false)

	const { enqueueSnackbar } = useSnackbar()
	const previousLocation = useLocation().state

	const handleClickShowPassword = () => setShowPassword((show) => !show)

	const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault()
	}

	const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault()
	}

	const [loginUser, { data, isLoading, isError, isSuccess, error }] = useLoginUserMutation()

	const loginSchema = object({
		username: string().email({ message: 'Invalid email' }),
		password: string()
			.min(3, { message: 'Password must be at least 3 characters' })
			.max(10, { message: 'Password must be less than 10 characters' }),
	})

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({ resolver: yupResolver(loginSchema) })

	const onSubmit = (data) => loginUser(data)

	useEffect(() => {
		if (data?.access_token && isSuccess) {
			localStorage.setItem('access_token', data.access_token)
			dispatch(setUser(data))
			enqueueSnackbar('Welcome', { variant: 'success' })
			const backPath = previousLocation?.back || '/'
			navigate(backPath)
		}
	}, [data, isSuccess])

	useErrorHandler({ isError, error, defaultMessage: 'Login error occurred' })

	return (
		<Container maxWidth={'sm'}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Stack spacing={2}>
					<TextField
						disabled={isLoading}
						{...register('username')}
						error={!!errors.username}
						helperText={errors?.username?.message?.message || ''}
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
						helperText={errors?.password?.message?.message || ''}
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
						type="submit"
						variant={'contained'}
						loading={isLoading}
						loadingPosition={'start'}
						sx={{ backgroundColor: '#1976d2' }}
					>
						{isLoading ? 'Loading...' : 'Login'}
					</Button>
				</Stack>
			</form>
		</Container>
	)
}
export default Login
