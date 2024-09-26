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

function base64ToBytes(base64: string) {
	const binString = atob(base64);
	return Uint8Array.from(binString, (m) => m.codePointAt(0));
}

function bytesToBase64(bytes: Uint8Array) {
	const binString = String.fromCodePoint(...bytes);
	return btoa(binString);
}


/* // Usage
bytesToBase64(new TextEncoder().encode("a Ā 𐀀 文 🦄")); // "YSDEgCDwkICAIOaWh
yDwn6aE"
new TextDecoder().decode(base64ToBytes("YSDEgCDwkICAIOaWhyDwn6aE"));
 */


export const encodeString = (string: string) => bytesToBase64(new TextEncoder().encode(string));
export const decodeString = (string: string) => (new TextDecoder().decode(base64ToBytes(string)));
