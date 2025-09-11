import { useAppSelector } from '../../app/store.ts'
import { selectUser } from '../../entities/User/model/store/userStore.ts'
import { Navigate } from 'react-router'
import type { ReactNode } from 'react'

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
	const user = useAppSelector(selectUser)

	if (!user) {
		console.log('ProtectedRoute user', user)
		return <Navigate to="/auth" />
	}
	return children
}

export default ProtectedRoute
