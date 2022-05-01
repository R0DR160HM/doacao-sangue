import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faBars, faUserInjured, faUserPlus, faSyringe, faChartLine, faRobot } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public showSidebar = false;

  public readonly icons = {
    bars: faBars,
    userPlus: faUserPlus,
    userInjured: faUserInjured,
    syringe: faSyringe,
    chart: faChartLine,
    robot: faRobot
  }

  constructor(
    private router: Router
  ) {}

  ngOnInit(): void {
  }

  navigate(page: string) {
    this.showSidebar = false;
    this.router.navigate([`/${page}`]);
  }

}
