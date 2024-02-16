import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Socket, SocketIoConfig } from 'ngx-socket-io';
import { map } from 'rxjs';
import { SocketNameSpace } from '../pages/game-menu/game-menu.component';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService{
  teste: SocketNameSpace;

  constructor(
    private socket: Socket
    ) {
      this.teste = new SocketNameSpace({ url: 'http://localhost:3000/message', options: {} })
    }

  emit(key: string, msg: any) {
    this.teste.emit(key, msg);
  }

  get(key: string) {
    return this.teste.fromEvent(key);
  }

  unlisten(key:string) {
    this.teste.off(key)
  }

  isConnected(): boolean {
    console.log(this.socket.ioSocket)
    return this.socket.ioSocket.connected
  }
}
