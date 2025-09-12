import { useAppSelector } from '../../../app/store.ts'
import { selectUser } from '../model/store/userStore.ts'
import { jwtDecode } from 'jwt-decode'
import { Avatar, Card } from '@mui/material'
import Typography from '@mui/material/Typography'

const Profile = () => {
	const user = useAppSelector(selectUser)!
	const tokenUntilSec = jwtDecode(user.access_token).exp!
	const tokenUntil = new Date(tokenUntilSec * 1000).toLocaleString()

	return (
		<Card sx={{ padding: '10px' }}>
			<Avatar>{user.username.slice(0, 1).toUpperCase()}</Avatar>
			<Typography>{user.username}</Typography>
			<Typography variant={'caption'}>{tokenUntil}</Typography>
		</Card>
	)
}

export default Profile
