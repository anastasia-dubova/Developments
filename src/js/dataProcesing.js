const separateNumber = value => {
	return value.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1,')
}

const getDevelopments = source => {
	let elementsList = ''
	source.forEach(value => {
		elementsList = `${elementsList}
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
	})
	return elementsList
}

export {getDevelopments}