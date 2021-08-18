import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  createItem<T>(key:string,item:T) {
    window.localStorage.setItem(key,JSON.stringify(item))
  }

  getItem<T>(key:string):T|null {
     let returnVal:T|null = null;
     let item = window.localStorage.getItem(key);
     if(item) {
        returnVal = JSON.parse(item)
     }
     return returnVal;
  }

  deleteItem(key:string) {
    localStorage.removeItem(key)
  }


}
