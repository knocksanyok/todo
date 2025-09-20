import type { UserTypeLogin } from '../model/userTypeLogin.ts'
import type { UserType } from '../model/userType.ts'

import { rtkApi } from '../../Todo/api/rtkApi.ts'

export const userApiRTK = rtkApi.injectEndpoints({
	endpoints: (builder) => ({
		loginUser: builder.mutation<UserType, UserTypeLogin>({
			query: (loginInf) => ({
				url: `/auth/login`,
				method: 'POST',
				body: loginInf,
			}),
		}),
	}),
})

export const { useLoginUserMutation } = userApiRTK
