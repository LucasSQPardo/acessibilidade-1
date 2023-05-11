import { UniqueIdService } from './../unique-id/unique-id.service';
import { resolveForwardRef } from '@angular/compiler/src/util';
import { Component, OnInit, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-yes-no-button-group',
  templateUrl: './yes-no-button-group.component.html',
  styleUrls: ['./yes-no-button-group.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => YesNoButtonGroupComponent) // ? forwardRef é usado quando existe no provider uma auto referencia do componente, pois caso não seja usado ele tenta referenciar algo que ainda não existe, então precisamos "jogar para frente"
    }
  ]
})
export class YesNoButtonGroupComponent implements OnInit, ControlValueAccessor {
  @Input() public disabled: boolean = false;
  @Input() public value: string = null;
  @Input() public label: string = ''
  @Output() public valueChange = new EventEmitter<string>();
  public options = YesNoButtonGroupOptions;
  public onChange = (value:string) => {}
  public onTouched = () => {}
  public id?: string;

  constructor(private uuid: UniqueIdService) {
    this.id = this.uuid.generateUniqueIdWithPrefix('yes-no-button');
  }

  public writeValue(value: string): void {
    this.value = value;
    this.onChange(this.value); // ? faz com que reconheça as mudanças por reactive Form
    this.valueChange.emit(this.value); // ? faz com que reconheça a mudança a partir do template Form
  }
  public registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }
  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  public setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  ngOnInit(): void {
  }

  public activate (value: string): void {
    this.value = value;
    this.writeValue(value)
  }

}


enum YesNoButtonGroupOptions {
  YES = 'yes',
  NO = 'no'
}
