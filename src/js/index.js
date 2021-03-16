import '../css/index.scss'


const developmentsList = document.querySelector('.developments__container');
const filterInput = document.querySelector('.filter__input');
const filterStartSymbolsCount = 3

const request_url = 'https://603e38c548171b0017b2ecf7.mockapi.io/homes'

let dataDevelopments = {};

(function (arr) {
  arr.forEach(function (item) {
    if (item.hasOwnProperty('append')) {
      return;
    }
    Object.defineProperty(item, 'append', {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function append() {
        var argArr = Array.prototype.slice.call(arguments),
          docFrag = document.createDocumentFragment();

        argArr.forEach(function (argItem) {
          var isNode = argItem instanceof Node;
          docFrag.appendChild(isNode ? argItem : document.createTextNode(String(argItem)));
        });

        this.appendChild(docFrag);
      }
    });
  });
})([Element.prototype, Document.prototype, DocumentFragment.prototype]);

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
		let newElement, newContainer, newItem
		
		newItem = document.createElement('div')
		newItem.classList.add('developments__item')
		developmentsList.appendChild(newItem)

		newElement = document.createElement('a')
		newElement.href = `./details/${value.id}`
		newElement.classList.add('item-dev')
		newItem.append(newElement)

		newContainer = document.createElement('div')
		newContainer.classList.add('item-dev__image-container')

		newItem = document.createElement('img')
		newItem.classList.add('item-dev__img')
		newItem.src = `https://via.placeholder.com/560x230/FF0000/FFFFFF?text=${value.title}`
		newContainer.append(newItem)

		newItem = document.createElement('div')
		newItem.classList.add('item-dev__label')

		newItem.innerHTML = value.type === 'IndependentLiving' ? 'Independent living' : (value.type === 'SupportAvailable' ? 'Restaurant & Support available' : '')
		newItem.classList.add(value.type === 'SupportAvailable' ? 'item-dev__label_o' : 'item-dev__label_b')
		newContainer.appendChild(newItem)

		newElement.append(newContainer)

		newContainer = document.createElement('div')
		newContainer.classList.add('item-dev__text')
		newElement.appendChild(newContainer)

		newItem = document.createElement('p')
		newItem.classList.add('item-dev__title')
		newItem.textContent = value.title
		newContainer.appendChild(newItem)

		newItem = document.createElement('p')
		newItem.classList.add('item-dev__address')
		newItem.textContent = value.address
		newContainer.appendChild(newItem)

		newItem = document.createElement('p')
		newItem.classList.add('item-dev__address')
		newItem.innerHTML =`New Properties for Sale from <b> £${separateNumber(value.price)} </b>`
		newContainer.appendChild(newItem)

		newItem = document.createElement('p')
		newItem.classList.add('item-dev__other')
		newItem.textContent = 'Shared Ownership Available'
		newContainer.appendChild(newItem)
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