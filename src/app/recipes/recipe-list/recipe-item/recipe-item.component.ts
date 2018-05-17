import { Recipe } from './../../../model/recipe';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'rb-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: Recipe;

  constructor() { }

  ngOnInit() {
  }

}
