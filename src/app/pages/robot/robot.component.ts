import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { DonatorDAO } from 'src/app/core/indexeddb/dao/donator.dao';
import { TablePopulationService } from 'src/app/core/services/table-population.service';
import { Donator } from 'src/app/shared/models/Donator';

@Component({
  selector: 'app-robot',
  templateUrl: './robot.component.html',
  styleUrls: ['./robot.component.scss']
})
export class RobotComponent implements OnInit {

  public control = new FormControl();
  private oldValue = 0;

  public data: Donator[] = [];
  public success = false;

  constructor(
    private service: TablePopulationService,
    private dao: DonatorDAO
  ) { }

  ngOnInit(): void {
  }

  public types = [
    'A+',
    'B+',
    'AB+',
    'O+',
    'A-',
    'B-',
    'AB-',
    'O-'
  ]

  public onInput() {
    this.success = false;
    const value = +this.control.value;
    if (!value || typeof value !== 'number' || this.oldValue === value) {
      return;
    }
    this.oldValue = value;
    this.data = this.service.createFakeData(value);
  }

  public confirm() {
    const donations$ = this.data.map(donation => this.dao.register(donation));
    forkJoin(donations$)
    .subscribe(() => {
      this.oldValue = 0;
      this.data = [];
      this.success = true;
    })
  }

}
