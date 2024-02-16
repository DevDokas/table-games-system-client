import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID, afterNextRender } from '@angular/core';
import { WebsocketService } from '../../services/websocket.service';
import { WebsocketFateBaseConnectionService } from '../../services/websocket/websocket-fate-base-connection.service';
import { StorageService } from '../../services/storage.service';
import { isPlatformBrowser } from '@angular/common';
import { Socket, SocketIoConfig } from 'ngx-socket-io';
import { Router } from '@angular/router';
import { log } from 'console';

export class SocketNameSpace extends Socket{
  constructor(socketConfig: SocketIoConfig){
    super(socketConfig);
  }
}

@Component({
  selector: 'app-game-menu',
  templateUrl: './game-menu.component.html',
  styleUrl: './game-menu.component.scss'
})
export class GameMenuComponent implements OnInit, OnDestroy {

  gameSelected: any

  messages: string[] = []
  rooms: any = []


  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,
    private storageService: StorageService,
    private websocketFateBaseConnectionService: WebsocketFateBaseConnectionService,
  ) {
    if (isPlatformBrowser(platformId)) {
      this.websocketFateBaseConnectionService.connect()
      this.disconnectFromSelectedRoom()
    }
  }

  ngOnInit(): void {

    if (isPlatformBrowser(this.platformId)) {
      this.getSelectedGame()
      this.getExistingRooms()
    }
  }

  ngOnDestroy(): void {
    this.disconnectWebsocket()
  }

  disconnectFromSelectedRoom() {
    const selectedRoom = this.storageService.getFromSessionStorage(this.storageService.roomSelected)
    const user_id = this.storageService.getFromLocalStorage(this.storageService.userId)

    const obj = {
      room: selectedRoom,
      user_id: user_id,
    }

    this.websocketFateBaseConnectionService.leaveRoom(obj);
    this.storageService.removeFromSessionStorage(this.storageService.roomSelected)
  }

  disconnectWebsocket() {
    if (isPlatformBrowser(this.platformId)) {
      console.log('oioioi')
      this.websocketFateBaseConnectionService.fateBasicSocket.removeAllListeners();
      this.websocketFateBaseConnectionService.fateBasicSocket.disconnect();
    }
  }

  getSelectedGame() {
    if (isPlatformBrowser(this.platformId)) {
      this.gameSelected = this.storageService.getFromSessionStorage(this.storageService.gameSelected)
      console.log(this.gameSelected)
    }
  }

  createRoom() {
    const numberOfRooms = this.rooms.length + 1
    const roomName = this.gameSelected.slug + '-' + numberOfRooms

    if (isPlatformBrowser(this.platformId)) {
      const obj = {
        room: roomName,
        game: this.gameSelected.slug,
        joined: []
      }

      this.rooms.push(obj)
      this.websocketFateBaseConnectionService.createRoom(obj);
      console.log(this.rooms)
    }
  }

  joinRoom(roomSelected: any) {
    const roomSel: string = this.gameSelected.slug + '-' + roomSelected
    let user_id : string = ''

    if (isPlatformBrowser(this.platformId)) {
      user_id = this.storageService.getFromLocalStorage(this.storageService.userId)

      const obj = {
        room: roomSel,
        user_id: user_id
      }
      //this.websocketFateBaseConnectionService.joinRoom(obj);
/*       this.websocketFateBaseConnectionService.fateBasicSocket.on('joinedRoom', (room: any) => {
        console.log(room)
        const index = this.rooms.findIndex((r: any) => r.room === room.room);

        console.log('oioioi')

        if (index !== -1) {
          this.rooms[index].joined = room.joined;
        } else {
          this.rooms.push(room);
        }

        console.log(this.rooms)

        console.log('oioioi')
        this.disconnectWebsocket()
      }) */
      this.storageService.setInSessionStorage(this.storageService.roomSelected, roomSel)
      this.router.navigate([`game/${this.gameSelected._id}/${this.gameSelected.slug}/${roomSel}`]);
    }

    console.log('oioioi')
  }

  getExistingRooms() {
    if(isPlatformBrowser(this.platformId)) {
      this.websocketFateBaseConnectionService.getExistingRooms();
      this.websocketFateBaseConnectionService.fateBasicSocket.on('existingRooms', (existingRooms: any[]) => {
        this.rooms = existingRooms.filter(room => room.game === this.gameSelected.slug);
        console.log(this.rooms);
      });
    }
  }
}
