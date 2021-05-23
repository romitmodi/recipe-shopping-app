import { Directive, HostBinding, HostListener } from "@angular/core";

@Directive({
    selector: '[appDropDown]'
})
export class DropDownDirective {

    @HostBinding('class.open') isOpen = false;

    @HostListener('mouseenter') onMouseHover() {
        this.isOpen = !this.isOpen;
    }

    @HostListener('mouseleave') onMouseAway() {
        this.isOpen = !this.isOpen;
    }
}