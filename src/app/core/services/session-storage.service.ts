import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  constructor() { }

  createItem<T>(key:string,item:T) {
    window.sessionStorage.setItem(key,JSON.stringify(item))
  }

  getItem<T>(key:string):T|null {
     let returnVal:T|null = null;
     let item = window.sessionStorage.getItem(key);
     if(item) {
        returnVal = JSON.parse(item)
     }
     return returnVal;
  }

  deleteItem(key:string) {
    sessionStorage.removeItem(key)
  }

}
