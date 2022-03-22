import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {

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

  @Output()
  public input = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  public onInput(data: any) {
    this.input.emit(data);
  }

}
