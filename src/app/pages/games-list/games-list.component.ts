import { Component, DoCheck, Inject, OnInit, PLATFORM_ID, afterNextRender, afterRender } from '@angular/core';
import { Router } from '@angular/router';

// Services
import { GamesService } from '../../services/games.service';
import { StorageService } from '../../services/storage.service';
import { EmitterService } from '../../services/emitter.service';
import { MatDialog } from '@angular/material/dialog';
import { LoginDialogComponent } from '../../components/login-dialog/login-dialog.component';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

// Material


@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html',
  styleUrl: './games-list.component.scss'
})
export class GamesListComponent implements DoCheck{

  sessionStorage = this.document.defaultView?.sessionStorage
  localStorage  = this.document.defaultView?.localStorage

  user_id: any
  user_token: any
  user_name: any

  isLoggedIn: boolean = false

  gamesList: any[] = []

  constructor (
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object,
    private gamesService: GamesService,
    private storageService: StorageService,
    private emitterService: EmitterService,
    public dialog: MatDialog,
    private router: Router
  ) {
    this.checkIsLoggedInBrowser()

    if (this.isLoggedIn) {
      this.getAllGames()
    }

    afterNextRender(() => {
      this.sessionStorage?.removeItem(this.storageService.gameNavbarMenu)
      this.getAllGames()
    })
  }

  ngDoCheck(): void {
    console.log(this.isLoggedIn)
  }

  getAllGames() {
    this.gamesService.getAll().subscribe({
      next: (res: any) => {
        console.log(res)
        this.gamesList = res
      },
      error: (err: any) => {
        console.log(err)
      }
    })
  }

  checkIsLoggedInBrowser() {
    console.log(this.platformId)
    if (isPlatformBrowser(this.platformId)) {
      console.log('passei aq')
      const user_id = this.storageService.getFromLocalStorage(this.storageService.userId)
      const user_name = this.storageService.getFromLocalStorage(this.storageService.userName)
      const user_token = this.storageService.getFromLocalStorage(this.storageService.userToken)

      console.log(user_id)

      if(user_id && user_name && user_token) {
        this.isLoggedIn = true
      }

      if (!this.isLoggedIn) {
        this.loginModal()
      }

      console.log(this.isLoggedIn)
    } else {
      return
    }
  }

  loginModal() {
    const dialogRef = this.dialog.open(LoginDialogComponent, {
      disableClose: true,
    })

    dialogRef.afterClosed().subscribe((response: any) => {
      this.checkIsLoggedInBrowser()
      this.emitterService.emit('login')
      this.getAllGames()
    })
  }

  selectGame(game: any) {
    if (isPlatformBrowser(this.platformId)) {
      this.emitterService.emit(game.menuOptionsList)
      this.storageService.setInSessionStorage(this.storageService.gameNavbarMenu, game.menuOptionsList)
      this.storageService.setInSessionStorage(this.storageService.gameSelected, game)
    }
    this.router.navigate([`game/${game._id}`])
  }

  redirectTo(id: string) {
    this.router.navigate([`game/${id}`])
  }
}
