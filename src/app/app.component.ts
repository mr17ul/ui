import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { style } from '@angular/animations';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent {

  constructor(private router: Router) { }

  ngAfterViewInit() {
    this.router.navigate(['home'])
  }
}
