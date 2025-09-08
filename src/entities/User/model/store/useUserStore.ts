import { create } from 'zustand'
import type { UserType } from '../userType.ts'
import { autoLogin } from '../../../../shared/util /autoLogin.ts'
import { devtools } from 'zustand/middleware'

type UserStoreState = {
	user: UserType | null
	setUser: (newUser: UserType) => void
	deleteUser: () => void
}

const userFromLS = autoLogin()

export const useUserStore = create<UserStoreState>()(
	devtools((set) => {
		return {
			user: userFromLS,
			setUser: (user: UserType) => {
				set({ user })
			},
			deleteUser: () => set({ user: null }),
		}
	})
)
