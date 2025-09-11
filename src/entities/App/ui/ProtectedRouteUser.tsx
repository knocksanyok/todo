import { useAppSelector } from '../../../app/store.ts'
import { selectUser } from '../../User/model/store/userStore.ts'
import { Navigate } from 'react-router'
import type { ReactNode } from 'react'

const ProtectedRouteUser = ({ children }: { children: ReactNode }) => {
	const user = useAppSelector(selectUser)

	if (user) {
		console.log('ProtectedRouteUser user', user)
		return <Navigate to="/" />
	}
	return children
}

export default ProtectedRouteUser
