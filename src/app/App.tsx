import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

import './App.css'

import AppBar from '../shared/ui-kit/AppBar.tsx'
import { Container, InputAdornment, Paper, Stack, TextField, ToggleButton, ToggleButtonGroup } from '@mui/material'
import { AccountCircle } from '@mui/icons-material'
import LockIcon from '@mui/icons-material/Lock'
import Button from '@mui/material/Button'
import { type SyntheticEvent, useState } from 'react'

function App() {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [loading, setLoading] = useState(false)

	const [loginFormName, setloginFormName] = useState('login')

	const handleUserNameChange = (e: SyntheticEvent<HTMLTextAreaElement | HTMLInputElement>) =>
		setUsername(e.currentTarget.value)

	const handlePasswordChange = (e: SyntheticEvent<HTMLTextAreaElement | HTMLInputElement>) =>
		setPassword(e.currentTarget.value)

	const handleLogin = () => {
		setLoading(true)
		setTimeout(() => {
			setLoading(false)
		}, 2000)
	}

	const handleChange = (_event: React.MouseEvent<HTMLElement>, newAlignment: string) => {
		setloginFormName(newAlignment)
	}

	return (
		<>
			<AppBar />
			<div style={{ marginTop: '100px' }} />

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
								type="password"
								variant="filled"
								slotProps={{
									input: {
										startAdornment: (
											<InputAdornment position="start">
												<LockIcon />
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
								type="password"
								variant="filled"
								slotProps={{
									input: {
										startAdornment: (
											<InputAdornment position="start">
												<LockIcon />
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
								{loading ? 'Loading...' : 'Register'}
							</Button>
						</Stack>
					)}
				</Paper>
			</Container>
		</>
	)
}

export default App
