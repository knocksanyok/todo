import { createContext, useContext } from 'react'
import type { UserType } from '../userType.ts'

type UserContext = {
	user: UserType | undefined
	setUser: (user: UserType) => void
	deleteUser: () => void
}

export const UserContext = createContext<UserContext>({
	user: undefined,
	setUser: () => {},
	deleteUser: () => {},
})

export const useUserStore = () => {
	return useContext(UserContext)
}
