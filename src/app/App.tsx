import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

import './App.css'

import AppBar from '../shared/ui-kit/AppBar.tsx'
import { Container, InputAdornment, Stack, TextField } from '@mui/material'
import { AccountCircle } from '@mui/icons-material'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { type SyntheticEvent, useState } from 'react'

function App() {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [loading, setLoading] = useState(false)
	const [isLoginForm, setIsLoginForm] = useState(true)

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

	return (
		<>
			<AppBar />
			<div style={{ marginTop: '100px' }} />
			{isLoginForm ? (
				<Container maxWidth={'sm'}>
					<Stack spacing={2}>
						<TextField
							disabled={loading}
							value={username}
							onChange={handleUserNameChange}
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
											<AccountCircle />
										</InputAdornment>
									),
								},
							}}
						/>
						<Button onClick={handleLogin} variant={'contained'} loading={loading} loadingPosition={'start'}>
							{loading ? 'Loading...' : 'Login'}
						</Button>
					</Stack>
				</Container>
			) : (
				<Container maxWidth={'sm'}>
					<Stack spacing={2}>
						<TextField
							disabled={loading}
							value={username}
							onChange={handleUserNameChange}
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
											<AccountCircle />
										</InputAdornment>
									),
								},
							}}
						/>
						<Button onClick={handleLogin} variant={'contained'} loading={loading} loadingPosition={'start'}>
							{loading ? 'Loading...' : 'Login'}
						</Button>
					</Stack>
				</Container>
			)}
		</>
	)
}

export default App
