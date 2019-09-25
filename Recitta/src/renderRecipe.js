import moment from 'moment'
import { getFilters } from './filters'
import { sortRecipes, getRecipes} from './recipes'




// recipe app Dom structure

const generateRecipeDom = (recipe) => {
   const recipeLinkEl = document.createElement('a');
   const recipeDiv = document.createElement('div');
   const contentEl = document.createElement('p');
   const ingredientStat = document.createElement('span')
   const EditedStatusEl = document.createElement('p');

   recipeDiv.classList.add('recipe');
   EditedStatusEl.classList.add('edited-details');

   recipe.recipeName.length > 0 ? contentEl.textContent = recipe.recipeName : contentEl.textContent = 'unnamed recipe';

   recipeDiv.appendChild(contentEl);


   

   //setting up individual recipe links
   recipeLinkEl.setAttribute('href', `/edit-recipe.html#${recipe.id}`);
   recipeLinkEl.appendChild(recipeDiv);
   //setting up status message

   EditedStatusEl.textContent = lastEditedDetails(recipe.updatedAt);

   recipeDiv.appendChild(EditedStatusEl);

   ingredientStat.textContent = `${acquiredIngredientStat(recipe)}. (${recipe.ingredients.length} listed)`
   ingredientStat.classList.add('ingredientStat')
   recipeDiv.insertBefore(ingredientStat, EditedStatusEl)
   

   return recipeLinkEl


};



//render recipes
const renderRecipes = () => {
   const emptyRecipeCont = document.querySelector('#recipes');
   const { searchText, sortBy} = getFilters();
   const recipes = sortRecipes(sortBy);
   const filteredRecipe = recipes.filter((recipe) => {
      return recipe.recipeName.toLowerCase().includes(searchText.toLowerCase()) ;
   
   });
   emptyRecipeCont.innerHTML = ''
   if(filteredRecipe.length > 0) {
      filteredRecipe.forEach((recipe) => {
         let recipeEl = generateRecipeDom(recipe);
            emptyRecipeCont.appendChild(recipeEl);
      });

   }else {
      const emptyMessage = document.createElement('p');
      emptyMessage.textContent = `No saved recipes. Click the floating button to Add recipe`;
      emptyRecipeCont.appendChild(emptyMessage);
   };

};


// ================== Ingredients Dom  Structure================//

const generateIngredientDom = (ingredient) => {

   const ingredientContainer = document.createElement('label');
   const checkbox = document.createElement('input');
   const ingredientText = document.createElement('p');
   const deleteBtn = document.createElement('button');

   ingredientContainer.classList.add('ingredient-item')

   ingredientText.textContent = ingredient.name;


   //* setting up checkbox
   
   checkbox.setAttribute('type', 'checkbox');
   checkbox.setAttribute('id', 'chckbox');
   
   checkbox.checked = ingredient.acquired


   ingredientContainer.appendChild(checkbox);
      ingredientContainer.appendChild(ingredientText);


   //*setting up delete button

   deleteBtn.textContent = 'x';

   ingredientContainer.appendChild(deleteBtn);
   deleteBtn.setAttribute('id','ingredientDelete');

   return ingredientContainer
};





const renderIngredients = (recipeId) => {

   const ingredientsCont = document.querySelector('#ingredients-cont');
   const recipes = getRecipes();
   const recipe = recipes.find(recipe => recipe.id === recipeId);



   ingredientsCont.innerHTML=''

   if (recipe.ingredients.length > 0) {
      recipe.ingredients.forEach((ingredient) => {
         ingredientsCont.appendChild(generateIngredientDom(ingredient))
      })
   }else{
      const noIngredients = document.createElement('p')
      noIngredients.textContent = 'You have no ingredients. Add some Below'
      ingredientsCont.appendChild(noIngredients)
   };



};

// display ingredients acquired status on the hope page

const acquiredIngredientStat = (recipe) => {
   const ingredients = recipe.ingredients;
   const _some = ingredients.some(ingredients => ingredients.acquired === true);
   const _every = ingredients.every(ingredients => ingredients.acquired === true);
   const emptyIngredients = ingredients.length === 0;
   if (emptyIngredients){
      return  `You have not included any ingredients`
   }else if (_every) {
      return `You have all the ingredients`
   } else if (_some) {
      return `You have some ingredients`
   }else if (!_every || !_some) {
      return `You have none of the listed ingredients`
   }
};






const initializeEditPage = (recipeId) => {
   const recipeNameEl = document.querySelector('#recipeTitle');
   const recipeBodyEl = document.querySelector('#recipeBody');
   const timeEl = document.querySelector('#edited-time');
   let recipes = getRecipes();
   let recipe = recipes.find((recipe) => recipe.id === recipeId);

   if (!recipe) {
      location.assign('/index.html')
   };

   recipeNameEl.value = recipe.recipeName;
   recipeBodyEl.value = recipe.recipeSteps;
   timeEl.textContent = lastEditedDetails(recipe.updatedAt);
   
};









const lastEditedDetails = (timestamp) => `Last Edited ${moment(timestamp).fromNow()}`;


export { generateRecipeDom, renderRecipes, initializeEditPage, lastEditedDetails, renderIngredients}


