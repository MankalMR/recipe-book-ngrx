import { Recipe } from './../../model/recipe';
import { RecipeService } from './../../common/services/recipe.service';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../../model/ingredient';

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
              private rService: RecipeService) { }

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
      const selectedRecipe: Recipe = this.rService.getRecipe(this.id);

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
      this.rService.updateRecipe(this.recipeForm.value, this.id);
    } else {
      this.rService.addRecipe(this.recipeForm.value);
    }

    if (this.isEditMode) {
      this.router.navigate(['../../', this.id], { relativeTo: this.route });
    } else {
      const newRecipeIndex = this.rService.noOfRecipes - 1;
      this.router.navigate(['/recipeList', newRecipeIndex], { relativeTo: this.route });
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

}
