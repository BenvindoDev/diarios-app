import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DiarioAddComponent } from '../diario-add/diario-add.component';

@Component({
  selector: 'app-diario-list',
  templateUrl: './diario-list.component.html',
  styleUrls: ['./diario-list.component.scss']
})
export class DiarioListComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  onClickAdd() {
    const ref = this.dialog.open(DiarioAddComponent, { maxWidth: '512px'});
    ref.afterClosed().subscribe({
      next: (result) => {
        console.log(result);
      },
    });
  }

  ngOnInit(): void {
  }

}
