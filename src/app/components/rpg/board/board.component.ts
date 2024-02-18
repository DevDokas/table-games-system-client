import { Component, ElementRef, Inject, AfterViewInit, HostListener, PLATFORM_ID } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BoardConfigurationsComponent } from './board-configurations/board-configurations.component';
import { isPlatformBrowser } from '@angular/common';
import { Sprite } from './interfaces/sprite.interface';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements AfterViewInit {

  sprites: Sprite[] = [];

  canvas: HTMLCanvasElement | null = null;
  cellSize: number = 50;
  backgroundImage: any
  numCols: number = 0;
  numRows: number = 0;
  screenHeight: any;
  screenWidth: any;

  tableBackground = '../../../../assets/images/background.jpg'

  constructor (
    @Inject(PLATFORM_ID) private platformId: Object,
    private dialog: MatDialog,
    private elementRef: ElementRef,
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.screenHeight = window.innerHeight;
      this.screenWidth = window.innerWidth;
    }
  }

  ngAfterViewInit(): void {
    this.init();
  }

  init() {
    if (isPlatformBrowser(this.platformId)) {
      const canvasEl = this.elementRef.nativeElement.querySelector('canvas');
      if (canvasEl) {
        this.canvas = canvasEl;
        const context = this.canvas?.getContext('2d');
        if (context) {
          this.backgroundImage = new Image();
          this.backgroundImage.onload = () => {
            if (this.canvas) {
              this.canvas.width = this.backgroundImage.width;
              this.canvas.height = this.backgroundImage.height;
              context.drawImage(this.backgroundImage, 0, 0);
              this.drawGrid(context, this.canvas.width, this.canvas.height, this.cellSize);
            }
          };
          //this.backgroundImage.src = 'https://nuckturp.com.br/wp-content/uploads/2023/01/Dungeon-Alchemist-VIla-em-5-minutos-Mesa-de-RPG-981x1024.jpg';
          console.log(this.backgroundImage.src)
        }
      }
    }
  }

  openConfig() {
    const dialogRef = this.dialog.open(BoardConfigurationsComponent, {
      disableClose: false,
      backdropClass: 'backdrop',
      data: {
        backgroundImage: this.backgroundImage,
        cellSize: this.cellSize
      }
    })

    dialogRef.afterClosed().subscribe((res: any) => {
      if (res != null) {
        if (res.cellSize != null) {
          this.cellSize = res.cellSize;
        }
        if (res.backgroundImage != null) {
          this.backgroundImage.src = res.backgroundImage;
        }
        this.redrawGrid(); // Redesenha o grid com as novas configurações
      }
    });
  }


  addSprite(sprite: Sprite) {
    this.sprites.push(sprite);
    this.redrawSprites();
  }

  redrawSprites() {
    const context = this.canvas?.getContext('2d');
    if (context && this.canvas) {
      context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      context.drawImage(this.backgroundImage, 0, 0);
      this.drawGrid(context, this.canvas.width, this.canvas.height, this.cellSize);

      // Desenhar todos os sprites
      this.sprites.forEach(sprite => {
        context.drawImage(sprite.image, sprite.x, sprite.y);
      });
    }
  }

  redrawGrid() {
    const context = this.canvas?.getContext('2d');
    if (context && this.canvas) {
      context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      context.drawImage(this.backgroundImage, 0, 0);
      this.drawGrid(context, this.canvas.width, this.canvas.height, this.cellSize);
    }
  }

  drawGrid(context: CanvasRenderingContext2D, canvasWidth: number, canvasHeight: number, cellSize: number) {
    const padding = 0;

    context.beginPath();
    context.lineWidth = 2;
    context.strokeStyle = '#272727';

    this.cellSize = cellSize;

    this.numCols = Math.floor(canvasWidth / this.cellSize);
    this.numRows = Math.floor(canvasHeight / this.cellSize);

    for (let x = 0; x <= this.numCols; x++) {
      const xPos = padding + x * this.cellSize;
      context.moveTo(xPos, padding);
      context.lineTo(xPos, canvasHeight);
    }

    for (let y = 0; y <= this.numRows; y++) {
      const yPos = padding + y * this.cellSize;
      context.moveTo(padding, yPos);
      context.lineTo(canvasWidth, yPos);
    }

    context.stroke();
  }

}
