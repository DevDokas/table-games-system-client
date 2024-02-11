import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  gameSelected = 'GAME_SELECTED'
  gameNavbarMenu = 'GAME_NAVBAR_MENU'

  constructor() { }

    // Method to get data from localStorage
    getFromLocalStorage(key: string): any {
      const item = localStorage.getItem(key);
      return JSON.parse(item!);
    }

    // Method to set data in localStorage
    setInLocalStorage(key: string, value: any): void {
      localStorage.setItem(key, JSON.stringify(value));
    }

    // Method to remove data from localStorage
    removeFromLocalStorage(key: string): void {
      localStorage.removeItem(key);
    }

    // Method to clear all data from localStorage
    clearLocalStorage(): void {
      localStorage.clear();
    }

    // Method to get data from sessionStorage
    getFromSessionStorage(key: string): any {
      const item = sessionStorage.getItem(key);
      return JSON.parse(item!);
    }

    // Method to set data in sessionStorage
    setInSessionStorage(key: string, value: any): void {
      sessionStorage.setItem(key, JSON.stringify(value));
    }

    // Method to remove data from sessionStorage
    removeFromSessionStorage(key: string): void {
      console.log('pq nao apagaaaaa')
      sessionStorage.removeItem(key);
    }

    // Method to clear all data from sessionStorage
    clearSessionStorage(): void {
      sessionStorage.clear();
    }
}
