import '../css/index.scss'
import {get} from './dataAccess'
import {getDevelopments} from './dataProcesing'

const developmentsList = document.querySelector('.developments__container');
const filterInput = document.querySelector('.filter__input');
const filterStartSymbolsCount = 3

const request_url = 'https://603e38c548171b0017b2ecf7.mockapi.io/homes'

let dataDevelopments = {};


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

const init = () => {
	get(request_url)
		.then(response => {
			return JSON.parse(response)
		})
		.then(response => {
			dataDevelopments = response
			if(developmentsList) {
				developmentsList.innerHTML = getDevelopments(dataDevelopments)
			}
		})
		.catch(reject => {
			console.log('Error!', reject)
		})
	filterInput.addEventListener('input', filterDevelopments)
}

window.onload = init