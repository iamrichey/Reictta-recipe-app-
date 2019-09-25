import { initializeEditPage, lastEditedDetails, renderIngredients} from './renderRecipe'
import {  updateRecipe,removeRecipe, getRecipes} from './recipes'
import { addIngredient, updateIngredient} from './ingredients';


const recipeNameEl = document.querySelector('#recipeTitle');
const recipeBodyEl = document.querySelector('#recipeBody');
const removeRecipeButton = document.querySelector('#remove-button');
const timeEl = document.querySelector('#edited-time');
const inputIngredient = document.querySelector('#inputIngredients')
const ingredients = document.querySelector('#ingredients-cont')


// to remove the auto "#" in the recipe Id
const recipeId = location.hash.substr(1);

initializeEditPage(recipeId);

renderIngredients(recipeId);

recipeNameEl.addEventListener('input', (e) => {
   const recipe = updateRecipe(recipeId,{
      recipeName: e.target.value
   });
   timeEl.textContent = lastEditedDetails(recipe.updatedAt);
});

recipeBodyEl.addEventListener('input', (e) => {
   const recipe = updateRecipe(recipeId, {
      recipeSteps: e.target.value
   });
   timeEl.textContent = lastEditedDetails(recipe.updatedAt);

});


// =========recipe remove button========
removeRecipeButton.addEventListener('click', (e) => {
   // removeRecipe(recipeId)
   removeRecipe(recipeId);
   location.assign('/index.html');
})


// ========== ingredients ======





ingredients.addEventListener('click', (e) => {
   //Checking if clicked element was the checkbox
   if(e.target.tagName === 'INPUT') {
      const checked =  e.path[1].querySelector('INPUT').checked;
      const ingredientText = e.path[1].querySelector('P').textContent;
   updateIngredient(recipeId, ingredientText, {
      checked: checked
   });
   updateTime()
   };
   //checking if clicked element was the delete button

   if (e.target.id === 'ingredientDelete'){
      const ingredientText = e.path[1].querySelector('P').textContent;

      updateIngredient(recipeId, ingredientText, {
         remove: true
      });
      updateTime()
      console.log('remove')
      renderIngredients(recipeId);
   };
});




// add new ingredient functionality
inputIngredient.addEventListener('submit', (e) => {
   e.preventDefault();
   const name = e.target.elements.text.value.trim();
   if (name.length > 0) {
      addIngredient(recipeId, name);
      updateTime()
      renderIngredients(recipeId);
   }
   e.target.elements.text.value = ''
});

const updateTime = () => {
   const recipe = getRecipes().find(recipe => recipe.id === recipeId);
   timeEl.textContent = lastEditedDetails(recipe.updatedAt);
}













window.addEventListener('storage', (e) => {
   if(e.key ==='recipes')
   initializeEditPage(recipeId);
});

