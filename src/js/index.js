import '../css/index.scss'


const developmentsList = document.querySelector('.developments__container');
const filterInput = document.querySelector('.filter__input');
const filterStartSymbolsCount = 3

const request_url = 'https://603e38c548171b0017b2ecf7.mockapi.io/homes'

let dataDevelopments = {};

const get = url => {
	return new Promise((response, reject) => {
		const request = new XMLHttpRequest()

		request.open('GET', request_url, true)

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

const filterDevelopments = e =>{
	const fltr = e.target.value.trim().toUpperCase()
	if(fltr.length > filterStartSymbolsCount) {
		getDevelopments(dataDevelopments.filter(value => value.title.toUpperCase().indexOf(fltr) > -1))
	} else {
		if(fltr.length === filterStartSymbolsCount && e.data === null) {
			getDevelopments(dataDevelopments)
		}
	}

}

const getDevelopments = source => {
	developmentsList.innerHTML = ''
	source.forEach(value => {
		const element = `
			<div class="developments__item">
				<a href="./details/${value.id}" class="item-dev">
					<div class="item-dev__image-container">
						<img src="https://via.placeholder.com/560x230/FF0000/FFFFFF?text=${value.title}" alt="${value.title}" class="item-dev__img">
						<div class="item-dev__label ${value.type === 'SupportAvailable' ? 'item-dev__label_o' : 'item-dev__label_b'}">
							${value.type === 'IndependentLiving' ? 'Independent living' : (value.type === 'SupportAvailable' ? 'Restaurant & Support available' : '')}
						</div>
					</div>
					<div class="item-dev__text">
						<div class="item-dev__container">
							<p class="item-dev__title">${value.title}</p>
							<p class="item-dev__address">${value.address}</p>
						</div>
						<div class="item-dev__container">
							<p class="item-dev__address">New Properties for Sale from <b> £${separateNumber(value.price)} </b></p>
							<p class="item-dev__other">Shared Ownership Available</p>
						</div>
					</div>
				</a>
			</div>
		`
		developmentsList.innerHTML = `${developmentsList.innerHTML} ${element}`
	})
}

const separateNumber = value => {
	return value.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1,')
}

const init = () => {
	get(request_url)
		.then(response => {
			return JSON.parse(response)
		})
		.then(response => {
			dataDevelopments = response

			getDevelopments(dataDevelopments)

		})
		.catch(reject => {
			console.log('Error!', reject)
		})

	filterInput.addEventListener('input', filterDevelopments)
}



window.onload = init