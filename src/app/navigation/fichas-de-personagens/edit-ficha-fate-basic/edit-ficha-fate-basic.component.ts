import { Component, DoCheck, Inject, PLATFORM_ID } from '@angular/core';
import { FateBasicService } from '../../../services/fate-basic.service';
import { UserService } from '../../../services/user.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormArray, FormBuilder, FormGroup, AbstractControl, Validators } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-edit-ficha-fate-basic',
  templateUrl: './edit-ficha-fate-basic.component.html',
  styleUrls: ['./edit-ficha-fate-basic.component.scss']
})
export class EditFichaFateBasicComponent implements DoCheck {

  fichaForm: FormGroup;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fateBasicService: FateBasicService,
    private userService: UserService,
    private fb: FormBuilder,
  ) {
    this.fichaForm = this.fb.group({
      char_name: [null],
      description: [null],
      refresh_points: [null],
      fate_points: [null],
      aspects_concept: [null],
      aspects_problem: [null],
      aspects_phase: this.fb.array([this.fb.control(null)]),
      expertise_average1: this.fb.array([this.fb.control(null)]),
      expertise_fair2: this.fb.array([this.fb.control(null)]),
      expertise_good3: this.fb.array([this.fb.control(null)]),
      expertise_great4: this.fb.array([this.fb.control(null)]),
      expertise_superb5: this.fb.array([this.fb.control(null)]),
      extras: this.fb.array([this.fb.control(null)]),
      stunts: this.fb.array([this.fb.control(null)])
    });

    if (this.data.type == 'edit') {
      this.fateBasicService.getCharById(this.data.charId).subscribe({
        next: (res: any) => {
          console.log(res)
          this.fichaForm.patchValue({
            char_name: res.char_name,
            description: res.description,
            refresh_points: res.refresh_points,
            fate_points: res.fate_points,
            aspects_concept: res.aspects.concept,
            aspects_problem: res.aspects.problem,
            aspects_phase: res.aspects.phase,
            expertise_average1: res.expertise.average1,
            expertise_fair2: res.expertise.fair2,
            expertise_good3: res.expertise.good3,
            expertise_great4: res.expertise.great4,
            expertise_superb5: res.expertise.superb5,
            extras: res.extras,
            stunts: res.stunts
          });
        },
        error: (err: any) => {
          console.log(err)
        }
      })
    }
  }

  ngDoCheck(): void {
    console.log(this.fichaForm.value)
  }

  addStunts() {
    if (isPlatformBrowser(this.platformId)) {
      const aspectsPhaseArray = this.fichaForm.get('stunts') as FormArray;
      aspectsPhaseArray.push(this.fb.control(null));
    }
  }

  addExtras() {
    if (isPlatformBrowser(this.platformId)) {
      const aspectsPhaseArray = this.fichaForm.get('extras') as FormArray;
      aspectsPhaseArray.push(this.fb.control(null));
    }
  }

  addExpertise(name: string) {
    if (isPlatformBrowser(this.platformId)) {
      const aspectsPhaseArray = this.fichaForm.get('expertise_' + name) as FormArray;
      aspectsPhaseArray.push(this.fb.control(null));
    }
  }

  addPhase() {
    if (isPlatformBrowser(this.platformId)) {
      const aspectsPhaseArray = this.fichaForm.get('aspects_phase') as FormArray;
      aspectsPhaseArray.push(this.fb.control(null));
    }
  }

  getControls(controlName: string): AbstractControl[] {
    return (this.fichaForm.get(controlName) as FormArray).controls;
  }


  create() {
    this.userService.getById(this.data.userId).subscribe({
      next: (res: any) => {
        console.log(res);

        const obj = {
          ficha: {
            char_name: this.fichaForm.value.char_name,
            description: this.fichaForm.value.description,
            aspects: {
              concept: this.fichaForm.value.aspects_concept,
              problem: this.fichaForm.value.aspects_problem,
              phase: this.fichaForm.value.aspects_phase
            },
            expertise: {
              average1: this.fichaForm.value.expertise_average1,
              fair2: this.fichaForm.value.expertise_fair2,
              good3: this.fichaForm.value.expertise_good3,
              great4: this.fichaForm.value.expertise_great4,
              superb5: this.fichaForm.value.expertise_superb5,
            },
            extras: this.fichaForm.value.extras,
            stunts: this.fichaForm.value.stunts,
          },
          user: res
        };

        this.fateBasicService.create(obj).subscribe({
          next: (res: any) => {
            console.log(res)
          },
          error: (err: any) => {
            console.log(err)
          }
        });
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }
}
