import { type FileRejection, useDropzone } from 'react-dropzone'
import { useCallback, useState } from 'react'

const DropZone = () => {
	const [files, setFiles] = useState<File[]>([])
	const onDrop = useCallback((acceptedFiles: File[], fileRejections: FileRejection[]) => {
		if (fileRejections.length > 0) {
			return alert('Данный тип файла запрещен или вы загрузили файл более 5 мб!')
		}
		setFiles(acceptedFiles)
		console.log(acceptedFiles)
	}, [])
	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		maxFiles: 1,
		accept: { 'image/png': ['.png'], 'image/jpeg': ['.jpg', '.jpeg'] },
		maxSize: 5_242_880,
	})

	const sendDataToBackend = async () => {
		const formData = new FormData()
		files.forEach((file) => {
			formData.append('file', file)
		})
		await fetch('https://todos-be.vercel.app/todos/', {
			method: 'POST',
			body: formData,
		})
	}

	const text = isDragActive
		? 'Отпускайте'
		: files.length > 0
			? 'Файл успешно загружен'
			: 'Сюда можете загрузить файл, можете кликнуть или перетащить'

	return (
		<>
			<div {...getRootProps({ className: isDragActive ? 'dropzone active' : 'dropzone' })}>
				<input {...getInputProps()}></input>
				<p>{text}</p>
			</div>
			<button onClick={sendDataToBackend}>Отправить файлы</button>
		</>
	)
}

export default DropZone
