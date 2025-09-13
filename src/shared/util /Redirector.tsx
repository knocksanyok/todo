import { useAppDispatch, useAppSelector } from '../../app/store.ts'
import { selectUser, setUser } from '../../entities/User/model/store/userStore.ts'
import { autoLogin } from './autoLogin.ts'
import { Navigate, Outlet } from 'react-router'

const Redirector = () => {
	const user = useAppSelector(selectUser)
	const userFromLs = autoLogin()
	const dispatch = useAppDispatch()

	console.log(userFromLs, 'From Redirector')

	if (!user && !userFromLs) {
		return <Navigate to={`/auth/login`} state={{ back: location.pathname }} />
	}

	if (!user && userFromLs) {
		dispatch(setUser(userFromLs))
	}

	return <Outlet />
}

export default Redirector
