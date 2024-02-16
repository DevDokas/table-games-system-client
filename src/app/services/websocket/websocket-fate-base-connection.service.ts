import { Injectable } from '@angular/core';
import { SocketNameSpace } from '../../pages/game-menu/game-menu.component';

@Injectable({
  providedIn: 'root'
})
export class WebsocketFateBaseConnectionService {
  fateBasicSocket!: SocketNameSpace;

  constructor() {}

  connect() {
    this.fateBasicSocket = new SocketNameSpace({ url: 'http://localhost:3000/fate-basic', options: {} })
  }

  emit(data: any) {
    this.fateBasicSocket.emit('events', data);
  }

  rollDice(data: any) {
    this.fateBasicSocket.emit('diceRoll', data)
  }

  getRollDice() {
    return this.fateBasicSocket.fromEvent<any>('diceRolled');
  }

  getExistingRooms() {
    this.fateBasicSocket.emit('getExistingRooms')
  }

  createRoom(data: any) {
    this.fateBasicSocket.emit('createRoom', data);
  }

  deleteRoom(room: string) {
    this.fateBasicSocket.emit('deleteRoom', room);
  }

  joinRoom(data: any) {
    this.fateBasicSocket.emit('joinRoom', data);
  }

  leaveRoom(data: any) {
    this.fateBasicSocket.emit('leaveRoom', data);
  }

  get(key: string) {
    return this.fateBasicSocket.fromEvent(key);
  }

  unlisten(key:string) {
    this.fateBasicSocket.off(key)
  }
}
