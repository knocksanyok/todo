import { useAppSelector } from '../../app/store.ts'
import { selectUser } from '../../entities/User/model/store/userStore.ts'
import { autoLogin } from './autoLogin.ts'
import { Navigate, Outlet } from 'react-router'

const AuthRedirector = () => {
	const user = useAppSelector(selectUser)
	const userFromLs = autoLogin()

	console.log(userFromLs, 'AuthRedirector')

	if (user && userFromLs) {
		return <Navigate to={`/`} />
	}

	return <Outlet />
}

export default AuthRedirector
