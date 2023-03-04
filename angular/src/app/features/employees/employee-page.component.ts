import { LocalDTO } from "./../../../../../common/src/schemas/locals-schema";
import { loadLocals } from "./../../../../../common/src/signals/locals.signal";
import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SelectComponent } from "./external";
import { ReadonlySignal } from "@preact/signals";

@Component({
  selector: "app-employee-page",
  standalone: true,
  imports: [CommonModule, SelectComponent],
  template: `
    <h2>Employee</h2>
    <label>Selected employee</label>
    <app-select
      [dataSource]="locals.value.data || []"
      (onChange)="handleSelectChange($event)"
    >
      <ng-template #itemTemplate let-item>
        {{ item.local }} - {{ item.name }}
      </ng-template>
    </app-select>
  `,
  styles: [],
})
export class EmployeePageComponent implements OnInit {
  private localsSignal = loadLocals;
  locals = this.localsSignal.state;

  constructor() {}

  ngOnInit() {
    this.localsSignal.run();
  }

  handleSelectChange(event: any) {
    console.log(event);
  }
}
