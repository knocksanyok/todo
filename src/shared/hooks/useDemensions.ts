import { useEffect, useState } from 'react'

interface Dimensions {
	width: number
	height: number
}

export const useDimensions = (element?: HTMLElement | null) => {
	const [dimensions, setDimensions] = useState<Dimensions>({
		width: element?.offsetWidth ?? window.innerWidth,
		height: element?.offsetHeight ?? window.innerHeight,
	})

	useEffect(() => {
		if (element) {
			return element.addEventListener('resize', () => {
				setDimensions({
					width: element.offsetWidth,
					height: element.offsetHeight,
				})
			})
		} else {
			return window.addEventListener('resize', () => {
				setDimensions({
					width: window.innerWidth,
					height: window.innerHeight,
				})
			})
		}
	}, [])

	return {
		width: dimensions.width,
		height: dimensions.height,
		isMobile: dimensions.width < 400,
	}
}

export default useDimensions
