import { useEffect } from 'react'
import { enqueueSnackbar } from 'notistack'
import type { SerializedError } from '@reduxjs/toolkit'
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query'

type UseErrorHandlerProps = {
	isError: boolean
	error?: string | undefined | [] | FetchBaseQueryError | SerializedError
	defaultMessage: string
}

export const useErrorHandler = ({ isError, error, defaultMessage }: UseErrorHandlerProps) => {
	useEffect(() => {
		if (isError) {
			let errorMessage = defaultMessage
			if (error && typeof error === 'object' && 'data' in error) {
				const errorData = error.data as { message?: string }
				if (errorData.message) {
					errorMessage = errorData.message
				}
			}
			enqueueSnackbar(errorMessage, { variant: 'error' })
		}
	}, [isError, error, defaultMessage])
}

export default useErrorHandler
