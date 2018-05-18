import { Recipe } from './../../model/recipe';
import { RecipeService } from './../../common/services/recipe.service';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../../model/ingredient';
import { Store } from '@ngrx/store';
import * as fromRecipeReducers from '../store/recipes.reducers';
import * as RecipesActions from './../store/recipes.actions';

@Component({
  selector: 'rb-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  isEditMode: boolean;
  recipeForm: FormGroup;
  constructor(private route: ActivatedRoute,
              private router: Router,
              private rService: RecipeService,
              private store: Store<fromRecipeReducers.RecipesState>) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.isEditMode = (typeof this.id !== 'undefined');
      this.initForm();
    });
  }

  initForm () {
    let recipeName = '',
        imagePath = '',
        desc = '',
        ingredients: FormGroup[] = [this.ingredientEmptyState()];

    if (this.isEditMode) {
      this.store.select('recipes')
        .take(1)
        .subscribe((state) => {
          const selectedRecipe: Recipe = state.recipes[this.id];
          recipeName = selectedRecipe.name;
          imagePath = selectedRecipe.imagePath;
          desc = selectedRecipe.description;

          if (selectedRecipe.ingredients) {
            ingredients = selectedRecipe.ingredients.map(
              (ingredient: Ingredient) => {
                return new FormGroup({
                  name: new FormControl(
                              ingredient.name,
                              Validators.required),
                  amount: new FormControl(
                                ingredient.amount,
                                [Validators.required,
                                Validators.pattern(/^[1-9]+[0-9]*$/)])
              });
            });
          }
        });
    }

    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      imagePath: new FormControl(imagePath),
      description: new FormControl(desc),
      ingredients: new FormArray(ingredients)
    });
  }

  onSubmit () {
    if (this.isEditMode) {
      this.store.dispatch(new RecipesActions.UpdateRecipe({updatedRecipe: this.recipeForm.value, index: this.id}));
      // this.rService.updateRecipe(this.recipeForm.value, this.id);
      this.router.navigate(['../../', this.id], { relativeTo: this.route });
    } else {
      this.store.dispatch(new RecipesActions.AddRecipe(this.recipeForm.value));
      this.store.select('recipes')
        .take(1)
        .subscribe((state) => {
          const newRecipeIndex = state.recipes.length - 1;
          this.router.navigate(['/recipeList', newRecipeIndex], { relativeTo: this.route });
        });
    }
  }

  onCancel () {
    if (this.isEditMode) {
      this.router.navigate(['../../', this.id], { relativeTo: this.route });
    } else {
      this.router.navigate(['/recipeList']);
    }
  }

  addRecipeIngredient () {
    this.recipeIngredients.push(this.ingredientEmptyState());
  }

  removeRecipeIngredient (index: number) {
    this.recipeIngredients.removeAt(index);
  }

  get recipeIngredients (): FormArray {
    return (<FormArray>this.recipeForm.get('ingredients'));
  }

  ingredientEmptyState () {
    return new FormGroup({
      name: new FormControl('', Validators.required),
      amount: new FormControl('', [Validators.required,
                                   Validators.pattern(/^[1-9]+[0-9]*$/)])
    });
  }

  getControls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

}
