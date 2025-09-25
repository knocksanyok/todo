import { useCallback, useState } from 'react'

interface useEditModeProps {
	initialTitleState: boolean
	initialDescriptionState: boolean
}

export const useEditMode = ({ initialTitleState = true, initialDescriptionState = true }: useEditModeProps) => {
	const [isEditTitle, setEditTitle] = useState(initialTitleState)
	const [isEditDescription, setEditDescription] = useState(initialDescriptionState)

	const handleTitleChange = useCallback(() => {
		setEditTitle((prev) => !prev)
	}, [])

	const handleDescriptionChange = useCallback(() => {
		setEditDescription((prev) => !prev)
	}, [])

	return { handleTitleChange, handleDescriptionChange, isEditTitle, isEditDescription }
}

export default useEditMode
