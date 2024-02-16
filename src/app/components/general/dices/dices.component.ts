import { isPlatformBrowser } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, Inject, Input, OnChanges, Output, PLATFORM_ID, SimpleChanges, afterNextRender } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-dices',
  templateUrl: './dices.component.html',
  styleUrl: './dices.component.scss'
})
export class DicesComponent implements OnChanges {
  @Input() hasD4: boolean = false
  @Input() hasD6: boolean = false
  @Input() hasD8: boolean = false
  @Input() hasD10: boolean = false
  @Input() hasD12: boolean = false
  @Input() hasD20: boolean = false
  @Input() showResult: number = 0
  @Output() showResultChange: EventEmitter<number> = new EventEmitter<number>();

  diceColor: string = 'red'

  isDiceRolling: boolean = false
  animationItem: any

  options: AnimationOptions = {
    path: '../../../../assets/lottie/dice-roll.json',
    loop: false,
    autoplay: false,
    initialSegment: [0, 180],
  };

  stopedOptions: AnimationOptions = {
    path: '../../../../assets/lottie/dice-roll.json',
    loop: false,
    autoplay: false,
    initialSegment: [179, 180],
  };

  d4: any
  d6: any
  d8: any
  d10: any
  d12: any
  d20: any
  result: number = 0
  numberOfRolls: number = 0

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private cdr: ChangeDetectorRef
  ) {

    this.d4 = `../../../../assets/dices/${this.diceColor}/d4.png`
    this.d6 = `../../../../assets/dices/${this.diceColor}/d6.png`
    this.d8 = `../../../../assets/dices/${this.diceColor}/d8.png`
    this.d10 = `../../../../assets/dices/${this.diceColor}/d10.png`
    this.d12 = `../../../../assets/dices/${this.diceColor}/d12.png`
    this.d20 = `../../../../assets/dices/${this.diceColor}/d20.png`
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['showResult'].currentValue) {
      console.log('oi')
      this.isDiceRolling = true
      this.options.initialSegment = [179, 180];
      this.cdr.detectChanges()
    }
  }

  rollDice(numOfSides: number) {
    if (this.result > 0) {
      this.result = 0
    }
    if (this.showResult > 0) {
      this.showResult = 0
    }
    if (this.isDiceRolling) {
      this.isDiceRolling = false
    }
    this.isDiceRolling = true
    this.options = {
      ...this.options,
      initialSegment: [0, 180],
      autoplay: true,
    }
    this.result = Math.floor(Math.random() * (numOfSides - 1)) + 1
  }


  animationCreated(animationItem: AnimationItem): void {
    console.log(animationItem);
    animationItem.addEventListener('complete', () => {
      this.onAnimationComplete();
    });
  }

  onAnimationComplete() {
    // Função a ser executada após a animação terminar
    console.log('Animação terminada!');
    if (isPlatformBrowser(this.platformId)) {
      console.log('oi')
      this.showResult = this.result
      this.showResultChange.emit(this.showResult)
    }
    this.numberOfRolls++
    this.cdr.detectChanges()
    console.log(this.showResult)
    // Chame aqui a função que você deseja executar após a animação terminar
  }
}
