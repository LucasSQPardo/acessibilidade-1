import { KeyboardManagerItemDirective } from './keyboard-manager-item.directive';
import { ContentChildren, Directive, HostListener, QueryList } from "@angular/core";

@Directive({
  selector: '[appKm]'
})
export class KeyboardManagerDirective{
  // por ser uma Query list, ela atualiza com o update do DOM. Logo, se sumir um KeyboardManagerItemDirective pois foi deletado ou algo do tipo a QueryList refletira a mudança
  @ContentChildren(KeyboardManagerItemDirective) public items?: QueryList<KeyboardManagerItemDirective>; //significa: injeta todos que são KeyboardManagerItemDirective dentro do KeyboardManagerDirective

  @HostListener('keyup', ['$event'])
  public manageKeys(event: KeyboardEvent): void {
    console.log(this.items)
    switch(event.key) {
      case 'ArrowUp':
        this.moveFocus(ArrowDirection.RIGHT).focus();
        console.log('up')
        break;
      case 'ArrowDown':
        this.moveFocus(ArrowDirection.LEFT).focus();
        console.log('down')
        break;
      case 'ArrowRight':
        this.moveFocus(ArrowDirection.RIGHT).focus();
        break;
        case 'ArrowLeft':
        this.moveFocus(ArrowDirection.LEFT).focus();
        console.log('left')
        break;
    }
  }

  public moveFocus(direction: ArrowDirection): KeyboardManagerItemDirective{
    const items = this.items.toArray();
    const currentSelectedIndex = items.findIndex(item => item.isFocused());
    const targetElementFocus = items[currentSelectedIndex + direction];
    if(targetElementFocus){
      return targetElementFocus;
    }
    return direction === ArrowDirection.LEFT
      ? items[items.length-1]
      : items[0];
  }
}

enum ArrowDirection {
  LEFT = -1,
  RIGHT = 1,
}
