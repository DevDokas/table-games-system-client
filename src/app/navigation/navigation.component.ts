import { ChangeDetectorRef, Component, ElementRef, Inject, PLATFORM_ID, ViewChild, afterNextRender } from '@angular/core';
import { Router } from '@angular/router';
import { EmitterService } from '../services/emitter.service';
import { StorageService } from '../services/storage.service';
import { UserService } from '../services/user.service';
import { DOCUMENT } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';
import { WebsocketFateBaseConnectionService } from '../services/websocket/websocket-fate-base-connection.service';
import { MatDialog } from '@angular/material/dialog';
import { FichasDePersonagensComponent } from './fichas-de-personagens/fichas-de-personagens.component';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent {
  @ViewChild('content') contentRef!: ElementRef;

  navbarColor: string = ''
  navbarOptions: any

  userId: any
  userName: any
  userToken: any
  userImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAL8AAACUCAMAAAD1XwjBAAAAMFBMVEXk5ueutLfo6uursbTh4+SnrrGyuLu/xMa2u77e4OG6v8LY29zU19nJzc/GyszR1Na1MjGjAAAEYElEQVR4nO2cy5LjIAxFbfG2Dfz/344gNT1JJ04CyBbU+Gy6K6srEEKA5Gm6uLi4uLi4uLi4uLj4nwGYJunW6APi4+akzL+NAUxu80YLpZRI4B9t/OamISwAF41F1fMD+IMNUXZvAUzBzr+0/5gw29D5HEDYEf9jg+95HWxCvVOfUGLjVrkDOPNRfZ4D43qcAoj2revcGaBjfwZ88vwHA2bfmwFgvlZ/86HOAtFSJL83A2Sp/GxAN8gy57mhujGg0Pd/DAh9eBD4KvnoQl2EUXCV8pG1BwN0tXxhHbd4dP5q+WgA+xKArUH+POuVWX9F5H+YgIVZ//ZVyrmPYp4A2yYfPYhzBUBsHH6cgI3RANBN3s89AbA2Dz8uYb5NrDLx+aXf8E1Au3qEbROGSDD8uAC40rim1OEfbEmEbA7+N/0LjwPBWp95PqB5tgCINPK5zjEQSJYv6vcc8qeJIvpn/UZyyHcLjXxcwCz6V5rwg2iOAEQWfhAW/W0nx3sEj36i5ZtS0LH1sxwiibK3rJ/jSWl4/cP7P5V8pvgzevwffP8dPv8ZPf8cPf8HTyOf7fw1+Pl39PsHsvsfrgvE0e/fiO4/eXavxOj3z6Pf/09AEEE5H8BGf/9qKR74C+8L/Ojvv6O/v7eeIrnrH/AU0DL8gVs9elCD/A7qf3ATG7z+CnxlDBKdVOFWpkGcD++PDF7/ma5SyutvmS5NXgLy29r5O/m9eE8Gymagr/LtRFn9P3vd5DMQvy3G6rL/4vv+F9Vn/0siqo9TIETkVrkP4Fb23gIReu7/SpF0t/9uTv13fUXNV4CMRj/NghBCmwH6H6fcPOuiX3RuP03K8R+9hLj2FvL3QROkdJsPwZgQRuv/vXGvdyDtkLVibibvuf0EfduR5Em3rjH6YBar86rNK9kui0l95Ktzsk8jUFXudzcWY496ar/OluDmppMdqZO8KxsA5OrTgD/rfrH/Cm0xGrleTMCB98uctH+Sfr+ToU+Fld0EwKQtzJ+TntcotbD2YuM+5XWt+Ns8KGFWybKvQfpOQonP7Jpg/fk7M8C6n6cVm3B2ZgSwLQSdL/cWWH/eHIBbCBznyYSTDpWovmnN7qJOOZm5cIz6bAHG00MnAaQvvagqQmA4PdAAwpKxXQv0YQdkPJxTRcy32GOuV8CRhsw3HFGPBVM8ZfAz9DdcMFEVu32FsLSv8lBxwd9mwEy5m2HcOVd+gu5xDLbzXP8fZG/DPPLJHsgg0idr3xpAsJURlvlXGNCcDsHKpn4maK3FTZdTf2sUKn8XpaaxNpqqRL5ev25IqKu/TERpgK2X31AZQ0d9mQdwS7+hKj2IrL+iFV0nvwvvydR5EFV7UTs1MYjs6wIE1Hyrr7EwlZjiCeBM256pmICuhr+8w5OiM4GQ0sNYN7H/L6JQP7fe36iyPLQz90GWEv0kjUW0FDlQd+5TeJBp+KTnYRQkQYSfRqCjoM+KqDGTloI2Qzj8maUC/bLW4A+s0jwz9LTNhgAAAABJRU5ErkJggg=='

  gameSelected: any

  isLoggedIn: boolean = false

  showMenu: boolean = false
  isBagOpenned: boolean = false
  isSkillsOpenned: boolean = false

  sessionStorage = this.document.defaultView?.sessionStorage
  localStorage = this.document.defaultView?.localStorage

  constructor (
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private dialog: MatDialog,
    private userService: UserService,
    private emitterService: EmitterService,
    private storageService: StorageService,
  ) {

    if (isPlatformBrowser(platformId)) {
      this.gameSelected = this.storageService.getFromSessionStorage(this.storageService.gameSelected)
    }

    this.emitterService.event.subscribe((res) => {
      if (res == 'login') {
        this.getUserInfo()
      }
      if (res == 'joinedRoom') {
        this.showMenu = true
      }
      if (res == 'leftRoom') {
        this.showMenu = false
      }
    })
    this.getUserInfo()

    afterNextRender(() => {
      this.getNavbarOptions()

      if (this.router.url == '/') {
        this.navbarColor = '#1037a1'
        this.navbarOptions = []
      }
    })
  }

  toggleModal(screen: string) {
    if (screen == 'bag') {
      this.isBagOpenned = !this.isBagOpenned
    }
    if (screen == 'skills') {
      this.isSkillsOpenned = !this.isSkillsOpenned
    }
  }

  openModal(dialog: string) {
    if (dialog == 'fichas-personagens') {
      const dialogRef = this.dialog.open(FichasDePersonagensComponent, {
        disableClose: false,
        backdropClass: 'backdrop',
        data: {
          userId: this.userId
        }
      })

      dialogRef.afterClosed().subscribe((res) => {

      })
    }
  }

  getUserInfo() {
    if (isPlatformBrowser(this.platformId)) {
      this.userId = this.storageService.getFromLocalStorage(this.storageService.userId)
      this.userName = this.storageService.getFromLocalStorage(this.storageService.userName)
      this.userToken = this.storageService.getFromLocalStorage(this.storageService.userToken)

      if (this.userId) {
        this.userService.getById(this.userId).subscribe({
          next: (res: any) => {
            this.userImage = res.image
          },
          error: (err: any) => {
            console.log(err)
          }
        })
      }

      if (this.userId && this.userName && this.userToken) {
        this.isLoggedIn = true
      }
    }
  }

  getNavbarOptions() {
    const navbarOptions = this.sessionStorage?.getItem(this.storageService.gameNavbarMenu)
    const gameSelected = this.sessionStorage?.getItem(this.storageService.gameSelected)
    let gameSelectedParsed

    if (navbarOptions) this.navbarOptions = JSON.parse(navbarOptions)
    if (gameSelected) gameSelectedParsed = JSON.parse(gameSelected)
    this.navbarColor = gameSelectedParsed?.navbarBackgroundColor
  }

  redirectTo(route: string) {
    if(route == '/') {
      this.storageService.removeFromSessionStorage(this.storageService.gameNavbarMenu)
      location.href = route
    }
  }

  logout() {
    this.localStorage?.removeItem(this.storageService.userId)
    this.localStorage?.removeItem(this.storageService.userName)
    this.localStorage?.removeItem(this.storageService.userToken)
    location.reload()
  }

  forceRerender() {
    this.cdr.detectChanges();
  }
}
