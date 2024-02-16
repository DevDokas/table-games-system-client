import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, HostListener, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-bag',
  templateUrl: './bag.component.html',
  styleUrl: './bag.component.scss'
})
export class BagComponent {

  private isDragging = false;
  private initialX!: number;
  private initialY!: number;

  constructor(
/*     private dialogRef: MatDialogRef<BagComponent>,
    @Inject(DOCUMENT) private document: Document,
    private elementRef: ElementRef */
    ) {}

/*     close() {
      this.dialogRef.close();
    }

    onDragStart(event: MouseEvent) {
      this.isDragging = true;
      this.initialX = event.clientX - this.elementRef.nativeElement.getBoundingClientRect().left;
      this.initialY = event.clientY - this.elementRef.nativeElement.getBoundingClientRect().top;
    }

    @HostListener('document:mousemove', ['$event'])
    onDrag(event: MouseEvent) {
      if (this.isDragging) {
        const newX = event.clientX - this.initialX;
        const newY = event.clientY - this.initialY;
        this.elementRef.nativeElement.style.left = `${newX}px`;
        this.elementRef.nativeElement.style.top = `${newY}px`;
      }
    }

    @HostListener('document:mouseup')
    onDragEnd() {
      this.isDragging = false;
    } */

}
