import { Directive, 
         ElementRef, 
         HostBinding, 
         HostListener, 
         Input, 
         OnInit, 
         Renderer2 
        } from '@angular/core';

@Directive({
  selector: '[appBetterHighlight]'
})
export class BetterHighlightDirective implements OnInit {
 //Con el hostbinding accedo directamente a la property del elemento que quiero camnbiar
  @Input() defaultColor: string = 'transparent';
  @Input('appBetterHighlight') highlightColor: string = 'red';
  @HostBinding('style.backgroundColor') backgroundColor: string = this.defaultColor;
  constructor( private elRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    //this.renderer.setStyle(this.elRef.nativeElement,'background-color', 'blue');
    this.backgroundColor = this.defaultColor;
  }

  @HostListener('mouseenter') mouseover(eventData: Event){
   // this.renderer.setStyle(this.elRef.nativeElement,'background-color', 'blue');
    this.backgroundColor= this.highlightColor;//Acá aplico el hostBinfing, cambiando la propiedad
  }

  @HostListener('mouseleave') mouseleave(eventData: Event){
   // this.renderer.setStyle(this.elRef.nativeElement,'background-color', 'transparent');
    this.backgroundColor = this.defaultColor;
  }
}
