import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import { Avatar, Stack, Tooltip, useColorScheme } from '@mui/material'
import { FormControl, RadioGroup, FormControlLabel, Radio } from '@mui/material'
import { LightMode, DarkMode, LaptopMac } from '@mui/icons-material'

const ButtonAppBar = () => {
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
						<Typography variant="h6" component="div">
							Todos
						</Typography>
						<Typography variant="h6" component="div">
							About
						</Typography>
					</Stack>

					<FormControl>
						<RadioGroup
							aria-labelledby="demo-theme-toggle"
							name="theme-toggle"
							row
							value={mode}
							onChange={(event) => setMode(event.target.value as 'system' | 'light' | 'dark')}
						>
							<FormControlLabel value="system" control={<Radio />} label={<LaptopMac sx={{ display: 'block' }} />} />
							<FormControlLabel value="light" control={<Radio />} label={<LightMode sx={{ display: 'block' }} />} />
							<FormControlLabel value="dark" control={<Radio />} label={<DarkMode sx={{ display: 'block' }} />} />
						</RadioGroup>
					</FormControl>

					<Button color="inherit">Login</Button>
					<Tooltip title="User">
						<Avatar src={''} />
					</Tooltip>
				</Toolbar>
			</AppBar>
		</Box>
	)
}

export default ButtonAppBar
