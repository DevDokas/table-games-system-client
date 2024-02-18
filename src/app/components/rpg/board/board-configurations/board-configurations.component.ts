import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-board-configurations',
  templateUrl: './board-configurations.component.html',
  styleUrl: './board-configurations.component.scss'
})
export class BoardConfigurationsComponent {

  configForm: FormGroup

  constructor (
    public dialogRef: MatDialogRef<BoardConfigurationsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
  ) {
    this.configForm = this.fb.group({
      backgroundImage: [null],
      cellSize: [null]
    })

    if (data.cellSize) {
      this.configForm.controls['cellSize'].patchValue(data.cellSize)
    }

    if (data.backgroundImage) {
      this.configForm.controls['backgroundImage'].patchValue(data.backgroundImage.src)
    }
  }

  save() {
    this.dialogRef.close(this.configForm.value)
  }

  close() {
    this.dialogRef.close(null)
  }

}
