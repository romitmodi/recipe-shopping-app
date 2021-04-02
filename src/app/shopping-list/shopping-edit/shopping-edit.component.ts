import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared-model/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  @ViewChild('ingredientName') ingredientName:ElementRef;
  @ViewChild('ingredientQuantity') ingredientQuantity:ElementRef;

  @Output() ingredientAdditionEvent= new EventEmitter<Ingredient>();

  constructor() { }

  ngOnInit(): void {
  }

  onAddIngredient():void{
    this.ingredientAdditionEvent.emit(new Ingredient(this.ingredientName.nativeElement.value,this.ingredientQuantity.nativeElement.value));
  }
}
