import { Directive, ElementRef, HostBinding, HostListener } from "@angular/core";

@Directive({
    selector:'[appDropdown]'
})

export class DropdownDirective {
    //Agregandole el hostbinding agrego o saco la clase dinámicamente
    @HostBinding('class.open') isOpen = false;

    @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
        this.isOpen = this.elRef.nativeElement.contains(event.target) ? !this.isOpen : false;
      }

    constructor(private elRef: ElementRef){}
}