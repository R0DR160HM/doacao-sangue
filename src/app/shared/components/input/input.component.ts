import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit, OnChanges {

  @Input()
  public type: 'text' | 'email' | 'password' | 'textarea' | 'number' | '' = 'text';

  @Input()
  public placeholder = '';

  @Input()
  public value = '';

  @Input()
  public control: any = new FormControl();

  @Input()
  public options: { name: string, value: any }[] = [];

  @Input()
  public disabled = false;

  @Output()
  public input = new EventEmitter();

  constructor() { }

  ngOnChanges(): void {
    if (this.disabled) {
      this.control.disable();
    }
  }

  ngOnInit(): void {
    this.ngOnChanges();
    if (this.value) {
      this.control.setValue(this.value);
    }
  }

  public onInput(data: any) {
    this.input.emit(data);
  }

}
