import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs';
import { DonatorDAO } from 'src/app/core/indexeddb/dao/donator.dao';
import { BloodType } from 'src/app/shared/models/BloodType';
import { Donator } from 'src/app/shared/models/Donator';

@Component({
  selector: 'app-receive',
  templateUrl: './receive.component.html',
  styleUrls: ['./receive.component.scss']
})
export class ReceiveComponent implements OnInit {

  public isFirstPage = true;

  public donations: number[] = [];
  public totalDonated: number = 0;

  public form = new FormGroup({
    name: new FormControl('', { validators: [Validators.required] }),
    type: new FormControl('', { validators: [Validators.required] }),
    totalNeeded: new FormControl('', { validators: [Validators.required, Validators.min(1)] })
  })

  public bloodTypes = [
    { name: '', value: undefined },
    { name: 'A+', value: BloodType.A_Positive },
    { name: 'B+', value: BloodType.B_Positive },
    { name: 'AB+', value: BloodType.AB_Positive },
    { name: 'O+', value: BloodType.O_Positive },
    { name: 'A-', value: BloodType.A_Negative },
    { name: 'B-', value: BloodType.B_Negative },
    { name: 'AB-', value: BloodType.AB_Negative },
    { name: 'O-', value: BloodType.O_Negative },
  ];

  constructor(
    private dao: DonatorDAO
  ) { }

  ngOnInit(): void {
  }

  public navigate() {
    this.isFirstPage = !this.isFirstPage;
    if (!this.isFirstPage) {
      this.findAdequateBlood()
    }
  }

  public canNavigate() {
    return !(this.name.valid && this.type.valid);
  }

  public get type() {
    return this.form.controls['type'];
  }

  public get name() {
    return this.form.controls['name'];
  }

  public get totalNeeded() {
    return this.form.controls['totalNeeded'];
  }

  private findAdequateBlood() {
    this.dao.findAdequateBlood(this.type.value).subscribe(result => {
      this.donations = result;
      console.log(this.donations);
      this.totalDonated = result.reduce((a, b) => a + b);
    })
  }

  public getPercentage(index: number) {
    return ((100 / this.totalDonated) * this.donations[index]).toFixed(2);
  }

  public remove() {
    if (this.totalNeeded.value > this.totalDonated) {
      const reduce = confirm(`Infelizmente, nosso banco não possui ${this.totalNeeded.value}ml de sangue disponivel, gostaria de alterar o valor para ${this.totalDonated}?`)
      if (reduce) {
        this.totalNeeded.setValue(this.totalDonated);
      } else {
        return;
      }
    }
    
  }

}
