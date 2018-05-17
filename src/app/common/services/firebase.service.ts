import { Observable } from 'rxjs/Observable';
import { Recipe } from './../../model/recipe';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
// tslint:disable-next-line:import-blacklist
import 'rxjs/Rx';

@Injectable()
export class FirebaseService {
  private firebaseURL = 'https://manu-prj-db.firebaseio.com/recipeBook/';
  private dbExtn = '.json';

  constructor(private http: Http) { }

  saveData (dbName: string, data: any) {
    return this.http.put(this.firebaseURL + dbName + this.dbExtn, data);
  }

  fetchData (dbName: string) {
    return this.http.get(this.firebaseURL + dbName + this.dbExtn)
              .map((response: Response) => {
                return response.json();
              });
  }
}
