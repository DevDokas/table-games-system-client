import { Component, DoCheck, Inject, OnInit, afterNextRender } from '@angular/core';
import { Router } from '@angular/router';
import { EmitterService } from '../services/emitter.service';
import { StorageService } from '../services/storage.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent implements OnInit, DoCheck {

  navbarColor: string = ''
  navbarOptions: any

  sessionStorage = this.document.defaultView?.sessionStorage

  constructor (
    @Inject(DOCUMENT) private document: Document,
    private router: Router,
    private emitterService: EmitterService,
    private storageService: StorageService,
  ) {
    console.log(this.router.url)

  }

  ngOnInit(): void {
    this.getNavbarOptions()
    if (this.router.url == '/') this.navbarColor = '#1037a1'
  }

  getNavbarOptions() {
    const navbarOptions = this.sessionStorage?.getItem(this.storageService.gameNavbarMenu)
    const gameSelected = this.sessionStorage?.getItem(this.storageService.gameSelected)
    let gameSelectedParsed

    if (navbarOptions) this.navbarOptions = JSON.parse(navbarOptions)
    if (gameSelected) gameSelectedParsed = JSON.parse(gameSelected)
    console.log(gameSelectedParsed)
    this.navbarColor = gameSelectedParsed?.navbarBackgroundColor
  }

  ngDoCheck(): void {
    console.log(this.navbarOptions)
  }

  redirectTo(route: string) {
    if(route == '/') {
    }
    console.log(this.storageService.gameNavbarMenu)
    this.storageService.removeFromSessionStorage(this.storageService.gameNavbarMenu)
    this.router.navigate([`${route}`])
  }
}
