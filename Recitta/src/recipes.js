import uuidv4 from 'uuid/v4'
import moment from 'moment'


let recipes = [];


const loadRecipes = () => {
   //checking for existing recipes in local storage
   const recipesJson = localStorage.getItem('recipes')
   try {
      return recipesJson ? JSON.parse(recipesJson) : []
   } catch (e) {
      return []
   };
};

// save new recipes to local storage 
const saveRecipes = () => {
   let recipesJsonVar = JSON.stringify(recipes);
   localStorage.setItem('recipes', recipesJsonVar);
};


//getting recipes data
const getRecipes = () => recipes;


const createRecipe = () => {
   const timestamp = moment().valueOf();
   const id = uuidv4();
   recipes.push({
      id: id,
      recipeName:'',
      recipeSteps: '',
      updatedAt: timestamp,
      createdAt: timestamp,
      ingredients: []
   });
   
   saveRecipes();
   return id 
};


// --remove recipe-- feature 
const removeRecipe = (id) => {
   const recipeIndex = recipes.findIndex((recipe) => recipe.id === id);
   if (recipeIndex > -1) {
      recipes.splice(recipeIndex, 1);
      saveRecipes();
   };

};


//sorting recipes

const sortRecipes = (sortBy) => {
   if(sortBy === 'byEdited') {
      return recipes.sort(function(a,b) {
         if (a.updatedAt > b.updatedAt) {
            return -1
         }else if (a.updatedAt < b.updatedAt) {
            return 1
         } else return 0
      });
   } else if (sortBy === 'byCreated') {
      return recipes.sort(function(a,b) {
         if (a.createdAt > b.createdAt) {
            return -1
         } else if (a.createdAt < b.createdAt) {
            return 1
         }else return 0
      });
   } else if (sortBy === 'byAlphabetically') {
      return recipes.sort(function(a,b) {
         if (a.recipeName.toLowerCase() < b.recipeName.toLowerCase()) {
            return -1
         } else if (a.recipeName.toLowerCase() > b.recipeName.toLowerCase()) {
            return 1
         }else return 0
      });
   }else return recipes;
};

const updateRecipe = (id, {recipeName, recipeSteps}) => {
   const recipe = recipes.find((recipe) => recipe.id === id );
   if(!recipe){
      return undefined
   };

   if (typeof recipeName === 'string') {
      recipe.recipeName = recipeName;
      recipe.updatedAt = moment().valueOf();
   }
   if (typeof recipeSteps === 'string') {
      recipe.recipeSteps = recipeSteps;
      recipe.updatedAt = moment().valueOf();
   };

   saveRecipes();

   return recipe


};



recipes = loadRecipes();




export { getRecipes, createRecipe, removeRecipe, updateRecipe, sortRecipes, saveRecipes, loadRecipes}