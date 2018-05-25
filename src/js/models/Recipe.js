import axios from 'axios';

export default class Recipe {
	constructor(id) {
		this.id = id;
	}

	async getRecipe() {
		const proxy = 'https://cors-anywhere.herokuapp.com/';
		const key = `a4d4e70f6deae1622eda4a492182ad6e`;
		try {
			const res = await axios(`${proxy}http://food2fork.com/api/get?key=${key}&rId=${this.id}`);
			this.title = res.data.recipe.title;
			this.author = res.data.recipe.publisher;
			this.img = res.data.recipe.image_url;
			this.ingredients = res.data.recipe.ingredients;
		} catch (error) {
			alert(error);
		}
	}

	calcTime() {
		// Assuming that we need 15 min for each 3 ingredients
		const numIng = this.ingredients.length;
		const periods = Math.ceil(numIng / 3);
		this.time = periods * 15;
	}
}