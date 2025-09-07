import { autoLogin } from '../../../../shared/util /autoLogin.ts'
import { type PropsWithChildren, useState } from 'react'
import type { UserType } from '../userType.ts'
import { UserContext } from './userContext.tsx'

export const UserProvider = ({ children }: PropsWithChildren) => {
	const userFromLS = autoLogin()
	const [user, setUser] = useState<UserType | undefined>(userFromLS)

	const handleSetUser = (user?: UserType) => {
		if (user) {
			localStorage.setItem('user', JSON.stringify(user))
			setUser(user)
		} else {
			localStorage.removeItem('user')
			setUser(undefined)
		}
	}

	const deleteUser = () => {
		localStorage.removeItem('user')
		localStorage.removeItem('accessToken')
		setUser(undefined)
	}

	return (
		<UserContext.Provider value={{ user: user, setUser: handleSetUser, deleteUser: deleteUser }}>
			{children}
		</UserContext.Provider>
	)
}
