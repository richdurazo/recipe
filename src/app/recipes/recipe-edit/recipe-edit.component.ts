import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { RecipeService } from '../recipe.service';
@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  // we want to find out if we are editing a recipe or creating a new one
  // and I want to store that infomration in a new property

  editMode = false;
  recipeForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private recipeService: RecipeService) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.editMode = params['id'] != null;
          console.log(this.editMode);
          this.initForm();
        }
      );
  }

  onSubmit() {
    
  }

onAddIngredient() {
  // I know that I want this to be a form array but angular does not so I want to explicitly cast it with <> signs
  // Now evertying between the parenthasis is treated like a form array
 (<FormArray>this.recipeForm.get('ingredients')).push(
   new FormGroup({
    'name': new FormControl(null, Validators.required),
    'amount': new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[1-9]+[0-9]*$/)
    ])
   })
 );
}
  // it is important to know if we are in edit mode for our form
  // we will create a method responsible for initializng our form

  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);

    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);

      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
      if (recipe['ingredients']) {
        for (let ingredient of recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              'name': new FormControl(ingredient.name),
              'amount': new FormControl(ingredient.amount, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/)
              ])
            })
          );
        }
      }

    }
    //build a new recipe form
    // reach out to the recipefomr and assign a value
    // form group take a javascrip object where we have key value pairs for the controls we want to register

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients': recipeIngredients
    });

  }

}
