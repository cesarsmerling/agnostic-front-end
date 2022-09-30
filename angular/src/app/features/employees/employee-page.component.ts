import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SelectComponent } from "./external";

@Component({
  selector: "app-employee-page",
  standalone: true,
  imports: [CommonModule, SelectComponent],
  template: `
    <h2>Employee</h2>
    <label>Selected employee</label>
    <app-select
      [dataSource]="localEmployees"
      [value]="selected"
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
  localEmployees = [
    {
      local: "local 1",
      name: "Pepe",
    },
    {
      local: "local 2",
      name: "Juan",
    },
    {
      local: "local 3",
      name: "Pablo",
    },
  ];

  selected = {
    local: "local 2",
    name: "Juan",
  }; //this.localEmployees[1];

  constructor() {}

  ngOnInit(): void {}

  handleSelectChange(event: any) {
    console.log(event);
  }
}
