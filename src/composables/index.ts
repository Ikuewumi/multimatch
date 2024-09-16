export const sleep = (timeinMilliseconds = 3000) => {
	return new Promise(resolve => {
		setTimeout(resolve, timeinMilliseconds)
	})
}

export const shuffle = <T>(array: T[]) => {
	let currentIndex = array.length - 1

	while (currentIndex > 0) {
		let randomIndex = Math.floor(Math.random() * currentIndex)
		let temp = array[randomIndex]
		array[randomIndex] = array[currentIndex]
		array[currentIndex] = temp
		temp = null
		currentIndex--
	}


	return array

}
