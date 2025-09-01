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

type Props = {
	access_token?: string
	username?: string
}

const ButtonAppBar = (props: Props) => {
	const { username } = props

	const { mode, setMode } = useColorScheme()
	if (!mode) return null

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
								Todos
							</Typography>
						)}
						<Typography variant="h6" component="div">
							About
						</Typography>
					</Stack>

					<Paper elevation={3}>
						<IconButton value={mode} onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}>
							{mode === 'light' ? <WbSunnyIcon /> : <BedTimeIcon />}
						</IconButton>
					</Paper>

					{username ? (
						<Tooltip title={username}>
							<Avatar src={''} alt={username}>
								{username[0]}
							</Avatar>
						</Tooltip>
					) : (
						<Button color="inherit">Login</Button>
					)}
				</Toolbar>
			</AppBar>
		</Box>
	)
}

export default ButtonAppBar
