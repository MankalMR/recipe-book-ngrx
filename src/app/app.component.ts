import { Component, OnInit } from '@angular/core';
import * as firebaseSDK from 'firebase';

@Component({
  selector: 'rb-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  constructor() {}

  ngOnInit () {
    console.log('App Component: ngOnInit');

    const firebaseApp = firebaseSDK.initializeApp({
      apiKey: 'AIzaSyAa7t54AgVDxdeCvuTJjMkO2DLhTYCvE34',
      authDomain: 'manu-prj-db.firebaseapp.com',
      databaseURL: 'https://manu-prj-db.firebaseio.com',
      projectId: 'manu-prj-db',
      storageBucket: 'manu-prj-db.appspot.com',
      messagingSenderId: '501325767057'
    });
  }
}
