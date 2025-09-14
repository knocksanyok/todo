import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import { Avatar, Paper, Stack, Tooltip, useColorScheme } from '@mui/material'

import WbSunnyIcon from '@mui/icons-material/WbSunny'
import BedTimeIcon from '@mui/icons-material/BedTime'
import { removeUser, selectUser } from '../../entities/User/model/store/userStore.ts'
import { useSelector } from 'react-redux'
import { useAppDispatch, useAppSelector } from '../../app/store.ts'
import { NavLink, useLocation, useNavigate } from 'react-router'
import { selectUnDoneTodosLength } from '../../entities/Todo/model/store/selectors/selectUnDoneTodos.tsx'

const ButtonAppBar = () => {
	const undoneTodos = useAppSelector(selectUnDoneTodosLength)

	const username = useSelector(selectUser)

	const dispatch = useAppDispatch()

	const navigate = useNavigate()
	const location = useLocation()

	const isAboutPage = location.pathname === '/about'

	const { mode, setMode } = useColorScheme()

	if (!mode) return null

	const handleLogout = () => {
		localStorage.removeItem('accessToken')
		dispatch(removeUser())
	}

	const handleRedirectToProfile = () => {
		navigate('/profile')
	}

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="fixed">
				<Toolbar>
					<IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
						<MenuIcon />
					</IconButton>
					<Stack direction={'row'} spacing={2} style={{ flexGrow: 1 }}>
						{username && (
							<Typography variant="h6" component="div">
								Todos{' ' + undoneTodos}
							</Typography>
						)}
						<Typography variant="h6" component="div">
							<NavLink to={isAboutPage ? '/' : '/about'}>{isAboutPage ? 'Home' : 'About'}</NavLink>
						</Typography>
					</Stack>

					<Paper elevation={3} sx={{ marginRight: '15px' }}>
						<IconButton value={mode} onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}>
							{mode === 'light' ? <WbSunnyIcon /> : <BedTimeIcon />}
						</IconButton>
					</Paper>

					{username ? (
						<Stack direction={'row'} spacing={1}>
							<Tooltip title={username?.username}>
								<Avatar
									src={''}
									alt={username?.username}
									onClick={handleRedirectToProfile}
									style={{ cursor: 'pointer' }}
								>
									{username?.username[0]}
								</Avatar>
							</Tooltip>
							<Button color="inherit" variant="outlined" onClick={handleLogout}>
								Logout
							</Button>
						</Stack>
					) : (
						<Button
							color="inherit"
							onClick={() => {
								navigate('/')
							}}
						>
							Login
						</Button>
					)}
				</Toolbar>
			</AppBar>
		</Box>
	)
}

export default ButtonAppBar
