import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() navigationEvent= new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  onClickRecipe(){
    console.log('inside onClickRecipe');
    this.navigationEvent.emit('Recipe');
  }

  onClickShoppingList(){
    console.log('inside onClickShoppingList');
    this.navigationEvent.emit('Shopping-List');
  }

}
