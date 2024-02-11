import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmitterService {

  event: EventEmitter<any> = new EventEmitter();

  constructor() { }

  emit(event: any) {
    this.event.emit(event);
  }
}
