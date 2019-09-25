import {createRecipe } from './recipes'
import {setFilters} from './filters'
import {renderRecipes} from './renderRecipe'


renderRecipes();

document.querySelector('#newRecipeBtn').addEventListener('click', function (e) {
   const id = createRecipe();
   location.assign(`/edit-recipe.html#${id}`);
});




document.querySelector('#sort-Filter').addEventListener('change', function(e) {
   setFilters({
      sortBy: e.target.value
   });
   renderRecipes();
});

document.querySelector('#search').addEventListener('input', function(e) {
   setFilters ({
      searchText: e.target.value
   });
   renderRecipes();
});

window.addEventListener('storage', function(e) {
   if(e.key === 'recipes') {
      recipes =JSON.parse(e.newValue);
      renderRecipes();
      
      
   };
});