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
import type { UserType } from '../../entities/User/model/userType.ts'
import { type Dispatch, type SetStateAction } from 'react'
import { useTodosStore } from '../../entities/Todo/model/store/use TodosStore.ts'

type Props = {
	access_token?: string
	username?: string
	setUser: Dispatch<SetStateAction<UserType | null>>
}

const ButtonAppBar = ({ username, setUser }: Props) => {
	const todos = useTodosStore((state) => state.todos)
	const undoneTodos = todos.filter((todo) => !todo.completed)

	// const {access_token} = props
	// const { username } = props
	// const { setUser } = props

	const { mode, setMode } = useColorScheme()
	if (!mode) return null

	const handleLogout = () => {
		localStorage.removeItem('accessToken')
		setUser(null)
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
								Todos{' ' + undoneTodos.length}
							</Typography>
						)}
						<Typography variant="h6" component="div">
							About
						</Typography>
					</Stack>

					<Paper elevation={3} sx={{ marginRight: '15px' }}>
						<IconButton value={mode} onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}>
							{mode === 'light' ? <WbSunnyIcon /> : <BedTimeIcon />}
						</IconButton>
					</Paper>

					{username ? (
						<Stack direction={'row'} spacing={1}>
							<Tooltip title={username}>
								<Avatar src={''} alt={username}>
									{username[0]}
								</Avatar>
							</Tooltip>
							<Button color="inherit" variant="outlined" onClick={handleLogout}>
								Logout
							</Button>
						</Stack>
					) : (
						<Button color="inherit">Login</Button>
					)}
				</Toolbar>
			</AppBar>
		</Box>
	)
}

export default ButtonAppBar
