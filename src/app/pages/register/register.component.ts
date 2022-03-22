import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DonatorDAO } from 'src/app/core/indexeddb/dao/donator.dao';
import { BloodType } from 'src/app/shared/models/BloodType';
import { FormUtils } from 'src/app/shared/utils/form.utils';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public form = new FormGroup({
    name: new FormControl('', { validators: [Validators.required] }),
    type: new FormControl('', { validators: [Validators.required] }),
    totalDonated: new FormControl('', { validators: [Validators.required, Validators.min(1), Validators.max(500)] })
  })

  public bloodTypes = [
    { name: '', value: undefined },
    { name: 'A+', value: BloodType.A_Positive },
    { name: 'A-', value: BloodType.A_Negative },
    { name: 'B+', value: BloodType.B_Positive },
    { name: 'B-', value: BloodType.B_Negative },
    { name: 'AB+', value: BloodType.AB_Positive },
    { name: 'AB-', value: BloodType.AB_Negative },
    { name: 'O+', value: BloodType.O_Positive },
    { name: 'O-', value: BloodType.O_Negative },
  ]
  
  public success = false;

  constructor(
    private dao: DonatorDAO
  ) { }

  ngOnInit(): void {
  }

  public register() {
    this.success = false;
    if (this.form.invalid) {
      const errors = FormUtils.listErrorsFromFormGroup(this.form)
      if (errors[0] === 'required') {
        alert('Preencha todos os campos')
      } else if (errors[0] === 'min') {
        alert('Como você pretende doar essa quantidade de sangue?')
      } else if (errors[0] === 'max') {
        alert('Você não pode doar tanto sangue de uma vez, não é seguro');
      }
      return;
    }
    this.dao.register(this.form.value)
    .subscribe(r => {
      console.log(r);
      this.type.setValue(undefined);
      this.name.setValue(undefined);
      this.totalDonated.setValue(undefined);
      this.success = true;
    })
  }

  public get type() {
    return this.form.controls['type'];
  }

  public get name() {
    return this.form.controls['name'];
  }

  public get totalDonated() {
    return this.form.controls['totalDonated'];
  }

}
