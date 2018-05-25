import {elements} from './base';

export const clearRecipe = () => {
	elements.recipe.innerHTML = '';
};

const createIngredient = ingredient => `
	<li class="recipe__item">
		<svg class="recipe__icon">
		<use href="img/icons.svg#icon-check"></use>
		</svg>
		<div class="recipe__ingredient">${ingredient}</div>
	</li>
`;

export const renderRecipe = (recipe, isLiked) => {
	const markup = `
		<figure class="recipe__fig">
			<img class="recipe__img" src="${recipe.img}" alt="${recipe.title}">
			<h1 class="recipe__title">
				<span>${recipe.title}</span>
			</h1>
		</figure>

		<div class="recipe__details">
			<div class="ricipe__info">
				<svg class="recipe__info-icon">
                    <use href="img/icons.svg#icon-stopwatch"></use>
                </svg>
                <span class="recipe__info-data recipe__info-data--minutes">${recipe.time}</span>
                <span class="recipe__info-text">minutes</span>
			</div>
			<button class="recipe__love">
				<svg class="header__likes">
				    <use href="img/icons.svg#icon-heart${isLiked ? '' : '-outlined'}"></use>
				</svg>
			</button>
		</div>

		<div class="recipe__ingredients">
			<ul class="recipe__ingredients-list">
				${recipe.ingredients.map(el => createIngredient(el)).join('')}
			</ul>
		</div>
	`;
	elements.recipe.insertAdjacentHTML('afterbegin', markup);
};