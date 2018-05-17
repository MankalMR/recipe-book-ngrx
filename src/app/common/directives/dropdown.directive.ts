import { Directive, Input, HostListener, HostBinding } from '@angular/core';

@Directive({
  selector: '[rbDropdown]'
})
export class DropdownDirective {
  @HostBinding('class.open') isOpen = false;

  @HostListener('click') toggleOpen() {
    this.isOpen = !this.isOpen;
  }
  constructor() { }

}
