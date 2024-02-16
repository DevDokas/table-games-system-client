import { isPlatformBrowser } from '@angular/common';
import { ChangeDetectorRef, Component, Inject, OnDestroy, PLATFORM_ID } from '@angular/core';
import { WebsocketFateBaseConnectionService } from '../../../services/websocket/websocket-fate-base-connection.service';
import { Router } from '@angular/router';
import { StorageService } from '../../../services/storage.service';
import { EmitterService } from '../../../services/emitter.service';
import { log } from 'console';

console.log('oioi')

@Component({
  selector: 'app-fate-basic',
  templateUrl: './fate-basic.component.html',
  styleUrl: './fate-basic.component.scss'
})
export class FateBasicComponent implements OnDestroy {

  room: any
  user_id: any

  showResult: number = 0

  constructor (
    @Inject(PLATFORM_ID) private platformId: Object,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private storageService: StorageService,
    private emitterService: EmitterService,
    private websocketFateBaseConnectionService: WebsocketFateBaseConnectionService,
  ) {
    this.getUserInfo()

    if (isPlatformBrowser(platformId)) {
      const url = this.router.url.split('/')
      this.room = url[4]

      this.websocketFateBaseConnectionService.connect()
      this.websocketFateBaseConnectionService.fateBasicSocket.on('connect', () => {
        console.log('Conectado ao servidor WebSocket');
        this.websocketFateBaseConnectionService.joinRoom({room: this.room, user_id: this.user_id})
      });
      this.websocketFateBaseConnectionService.fateBasicSocket.on('joinedRoom', () => {
        this.getDiceRoll();
        this.emitterService.emit('joinedRoom')
        console.log('oi')
      })
      this.websocketFateBaseConnectionService.fateBasicSocket.on('alreadyJoinedRoom', () => {
        this.getDiceRoll();
        this.emitterService.emit('joinedRoom')
        console.log('oi')
      })
    }
  }

  getUserInfo() {
    if (isPlatformBrowser(this.platformId)) {
      this.user_id = this.storageService.getFromLocalStorage(this.storageService.userId)
    }
  }

  ngOnDestroy(): void {
    if(isPlatformBrowser(this.platformId)) {

      const obj = {
        room: this.room,
        user_id: this.user_id
      }

      this.websocketFateBaseConnectionService.leaveRoom(obj);
      this.emitterService.emit('leftRoom')
    }
  }

  handleShowResultChange(event: any) {
    console.log(event);

    const obj = {
      user_id: this.user_id,
      room: this.room,
      result: event
    }

    this.websocketFateBaseConnectionService.rollDice(obj)
  }

  getDiceRoll() {
    console.log('oi');
    this.websocketFateBaseConnectionService.fateBasicSocket.on('diceRolled', (data: any) => {
      console.log(data)
    })
    this.websocketFateBaseConnectionService.getRollDice().subscribe((res: any) => {
      console.log('oi')
      console.log(res)
      this.showResult = res.result
      this.cdr.detectChanges()
    })
  }
}
