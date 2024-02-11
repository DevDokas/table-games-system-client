import { Component } from '@angular/core';
import { Router } from '@angular/router';

// Services
import { GamesService } from '../../services/games.service';
import { StorageService } from '../../services/storage.service';
import { EmitterService } from '../../services/emitter.service';
import { MatDialog } from '@angular/material/dialog';
import { LoginDialogComponent } from '../../components/login-dialog/login-dialog.component';

// Material


@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html',
  styleUrl: './games-list.component.scss'
})
export class GamesListComponent {

  gamesList: any[] = []

  constructor (
    private gamesService: GamesService,
    private storageService: StorageService,
    private emitterService: EmitterService,
    public dialog: MatDialog,
    private router: Router
  ) {
    this.loginModal()
    this.getAllGames()
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

  loginModal() {
    const dialogRef = this.dialog.open(LoginDialogComponent, {
      disableClose: true,
    })

    dialogRef.afterClosed().subscribe((response: any) => {

    })
  }

  selectGame(game: any) {
    this.emitterService.emit(game.menuOptionsList)
    this.storageService.setInSessionStorage(this.storageService.gameNavbarMenu, game.menuOptionsList)
    this.storageService.setInSessionStorage(this.storageService.gameSelected, game)
    this.router.navigate([`game/${game._id}`])
  }

  redirectTo(id: string) {
    this.router.navigate([`game/${id}`])
  }
}
