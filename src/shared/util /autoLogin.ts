import { jwtDecode, type JwtPayload } from 'jwt-decode'

export const autoLogin = () => {
	const token = localStorage.getItem('accessToken')

	if (token) {
		try {
			const decodedToken = jwtDecode<JwtPayload & { username: string }>(token)

			if (decodedToken.exp && decodedToken.exp * 1000 >= Date.now()) {
				return { username: decodedToken.username, access_token: token }
			}

			localStorage.removeItem('accessToken')
			return null
		} catch (error) {
			console.error(error)
			localStorage.removeItem('accessToken')
			return null
		}
	}
	return null
}
