import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-erro',
  templateUrl: './erro.component.html',
  styleUrls: ['./erro.component.css']
})
export class ErroComponent implements OnInit {

  loading = false;
  apiError: any;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    let error = sessionStorage.getItem('erro');

    if (error !== null) {
      this.apiError = JSON.parse(error);
      console.log(this.apiError);

    }
    else {
      this.router.navigate(['home']);
    }
  }

}
