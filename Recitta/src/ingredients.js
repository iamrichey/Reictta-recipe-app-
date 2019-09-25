import { getRecipes,saveRecipes } from "./recipes";
import moment from 'moment'

const addIngredient = (id,name) => {
   //Get all recipes
   const recipes = getRecipes();

   //Find the individual recipe
   const recipe = recipes.find(recipe => recipe.id === id);

   const ingredient = {
      name,
      acquired: false
   };

   //Add the object to individual recipe's ingredients
   recipe.ingredients.push(ingredient);
   recipe.updatedAt = moment().valueOf();
   saveRecipes();

};


const updateIngredient = (id, name, update) => {
   //Get all recipes
   const recipes = getRecipes();

   //Find the individual recipe
   const recipe = recipes.find(recipe => recipe.id === id);

   //Find the updated ingredient
   const ingredient = recipe.ingredients.find(
      ingredient => ingredient.name === name
   );

   if (typeof update.checked === "boolean") {
      ingredient.acquired = update.checked;
      recipe.updatedAt = moment().valueOf()
   }


   if (typeof update.remove === "boolean") {
      //Remove the ingredient
      const index = recipe.ingredients.findIndex(
         ingredient => ingredient.name === name
      );

      if (index > -1) {
         recipe.ingredients.splice(index, 1)
      };
      recipe.updatedAt = moment().valueOf()
   }

   saveRecipes()
};

export {
   addIngredient,
   updateIngredient,

};