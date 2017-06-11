import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
    // our subject will pass an array of recipes as a value
    // we use recipesChanged in our addRecipe and updateRecipe methods bellow
    recipesChanged = new Subject<Recipe[]>();
    private recipes: Recipe[] = [
    new Recipe(
        'Skillet Chicken Bulgogi',
        'This is a quick and easy, but very tasty meal. You can substitute the chicken with beef or pork for variety.',
        'http://images.media-allrecipes.com/userphotos/600x600/2280937.jpg',
        [
            new Ingredient('Red Onion', 1),
            new Ingredient('Soy Sauce', 1),
            new Ingredient('garlic', 1),
            new Ingredient('beef', 1),
            new Ingredient('sesame oil', 1),
            new Ingredient('cayenne', 1),
            new Ingredient('sesame seeds', 1)
        ]),
    new Recipe(
        'Hot Dogs with Coney Sauce',
        'Top with shredded cheese and chopped onions',
        'http://images.media-allrecipes.com/userphotos/600x600/1124538.jpg',
        [
            new Ingredient('lean ground beef', 1),
            new Ingredient('worcestershire Sauce', 1),
            new Ingredient('bottle chili sauce', 2),
            new Ingredient('package chili seasoning', 1),
            new Ingredient('yellow mustard', 1),
            new Ingredient('hot dogs', 8),
            new Ingredient('hot dog buns', 8)
        ])
  ];

  constructor(private slService: ShoppingListService) {}
  getRecipes() {
      // return a new away that is a copy
      return this.recipes.slice();
  }
  getRecipe(index: number) {
      return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
      this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
      this.recipes.push(recipe);
      this.recipesChanged.next(this.recipes.slice());
  }
  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());

  }
  deleteRecipe(index: number) {
      this.recipes.splice(index, 1);
      this.recipesChanged.next(this.recipes.slice());
  }

}
