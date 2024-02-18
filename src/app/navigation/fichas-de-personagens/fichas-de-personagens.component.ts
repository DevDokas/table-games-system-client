import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { EditFichaFateBasicComponent } from './edit-ficha-fate-basic/edit-ficha-fate-basic.component';
import { FateBasicService } from '../../services/fate-basic.service';
import { isPlatformBrowser } from '@angular/common';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-fichas-de-personagens',
  templateUrl: './fichas-de-personagens.component.html',
  styleUrl: './fichas-de-personagens.component.scss'
})
export class FichasDePersonagensComponent {

  charList: any

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    private fateBasicService: FateBasicService,
    private storageService: StorageService,
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.getAllCharsById()
    }
  }

  openDialog(type: string, charId?: string) {
    const dialogRef = this.dialog.open(EditFichaFateBasicComponent, {
      data: {
        type: type,
        userId: this.data.userId,
        charId: charId,
      }
    })
  }

  getAllCharsById() {
    this.fateBasicService.getAllByUserId(this.data.userId).subscribe({
      next: (res: any) => {
        console.log(res)
        this.charList = res
      },
      error: (err: any) => {
        console.log(err)
      }
    })
  }

  selectChar(char: any) {
    if (isPlatformBrowser(this.platformId)) {
      this.storageService.setInSessionStorage(this.storageService.charSelected, char)
    }
  }
}
