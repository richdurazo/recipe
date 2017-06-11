import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { RecipeService } from '../recipes/recipe.service';
// anytime you want to inject a service into another service you must add @Injectable
// here we are add HTTP service that ships with angular to persist data to firebase so we must add @Injectable
// additionally we want to store/interact with recipes so we must reach out to the RecipeService

@Injectable()

export class DataStorageService {
    constructor(private http: Http,
                private recipeService: RecipeService) {}

    storeRecipes() {
        // put will overide data on firebase -- this may vary depending on what backend u use
        return this.http.put('https://ng-recipe-book-7f8f9.firebaseio.com/recipes.json', this.recipeService.getRecipes());
    }
}