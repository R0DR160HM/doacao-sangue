import { Component, OnInit } from '@angular/core';
import { DonatorDAO } from 'src/app/core/indexeddb/dao/donator.dao';

@Component({
  selector: 'app-storage',
  templateUrl: './storage.component.html',
  styleUrls: ['./storage.component.scss']
})
export class StorageComponent implements OnInit {

  public storage$ = this.dao.fullStorage();

  public types = [
    'A+',
    'B+',
    'AB+',
    'O+',
    'A-',
    'B-',
    'AB-',
    'O-',
    'Total'
  ]

  constructor(
    private dao: DonatorDAO
  ) { }

  ngOnInit(): void {
    // this.dao.
  }


}
