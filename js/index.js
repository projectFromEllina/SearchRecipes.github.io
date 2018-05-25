import Search from './models/Search';
import Recipe from './models/Recipe';
import Likes from './models/Likes';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as likesView from './views/likesView';
import {elements, renderLoader, clearLoader} from './views/base';

const state ={};

// SEARCH CONTROLLER
const controlSearch = async () => {
	// 1) Get query form view
	const query = searchView.getInput();

	if(query) {
		// 2) New search object and add to state
		state.search = new Search(query);
		// 3) Prepare UI for results
		searchView.clearInput();
		searchView.clearResults();
		renderLoader(elements.searchRes);

		try {
			// 4) Search for recipes
			await state.search.getResults();
			// 5) Render results on UI
			clearLoader();
			searchView.renderResults(state.search.result);
		} catch (err) {
			alert('Something wrong with the search...');
		}
	}
}

elements.searchForm.addEventListener('submit', e => {
	e.preventDefault();
	controlSearch();
});

elements.searchResPages.addEventListener('click', e => {
	const btn = e.target.closest('.btn-inline');
	if(btn) {
		const goToPage = parseInt(btn.dataset.goto, 10);
		searchView.clearResults();
		searchView.renderResults(state.search.result, goToPage);
	}
});

// RECIPE CONTROLLER
const controlRecipe = async () => {
	// Get ID from url
	const id = window.location.hash.replace('#', '');

	if (id) {
		// Prerare UI for changes
		recipeView.clearRecipe();
		renderLoader(elements.recipe);
		// Highlight selected search item
		searchView.highlightSelected(id);
		// Create new recipe object
		state.recipe = new Recipe(id);
		
		try {
			// Get recipe data
			await state.recipe.getRecipe();
			// Calculate time
			state.recipe.calcTime();
			// Render recipe
			clearLoader();
			recipeView.renderRecipe(
				state.recipe,
				state.likes.isLike(id)
				);
		} catch (err) {
			alert('Error processing recipe!');
			console.log(err)
		}
	}
};

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));

// LIKE CONTROLLER
const controlLike = () => {
	if (!state.likes) state.likes = new Likes();
	const currentID = state.recipe.id;

	// User has not yet liked current recipe
	if (!state.likes.isLike(currentID)) {
		// Add like to the state
		const newLike = state.likes.addLike(
				currentID,
				state.recipe.title,
				state.recipe.author,
				state.recipe.img
			);
		// Toggle the like button
		likesView.toggleLikeBtn(true);
		// Add like to UI list
		likesView.renderLike(newLike);
	// User has liked current recipe
	} else {
		// Remove like from the state
		state.likes.deleteLike(currentID);
		// Toggle the like button
		likesView.toggleLikeBtn(false);
		// Remove like from UI list
		likesView.deleteLike(currentID);
	}
	likesView.toggleLikeMenu(state.likes.getNumLikes());
};

// Restore liked recipes on page load
window.addEventListener('load', () => {
	state.likes = new Likes();
	// Restore likes
	state.likes.readStorage();
	// Toggle like menu button
	likesView.toggleLikeMenu(state.likes.getNumLikes());
	// Render the existing likes
	state.likes.likes.forEach(like => likesView.renderLike(like));
});


elements.recipe.addEventListener('click', e => {
	if(e.target.matches('.recipe__love, .recipe__love *')) {
		controlLike();
	}
});



