const get = url => {
	return new Promise((response, reject) => {
		const request = new XMLHttpRequest()

		request.open('GET', url, true)

		request.addEventListener('load', () => {
			if(request.status < 400) {
				response(request.response)
			} else {
				reject(new Error(`Request failed: ${request.statusText}`))
			}
		})
		request.addEventListener('error', () => {
			reject(new Error(`Network error`))
		})

		request.send()
	})
}

export {get}