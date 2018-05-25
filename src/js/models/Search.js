import axios from 'axios';

export default class Search {
	constructor(query) {
		this.query = query;
	}

	async getResults() {
		const proxy = 'https://cors-anywhere.herokuapp.com/';
		const key = `a4d4e70f6deae1622eda4a492182ad6e`;
		try {
			const res = await axios(`${proxy}http://food2fork.com/api/search?key=${key}&q=${this.query}`)
			this.result = res.data.recipes;
		} catch (error) {
			alert(error);
		}
		
	}
} 

