import { EmployeePageComponent } from "./features/employees/employee-page.component";
import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { isLoggedIn, userName } from "../../../src/signals/root.signal";
import { loginUser2 } from "./../../../src/signals/root.signal";
@Component({
  selector: "app-root",
  standalone: true,
  imports: [CommonModule, EmployeePageComponent],
  template: `
    <h1>Angular with Signals</h1>
    <app-employee-page></app-employee-page>
  `,
  styles: [],
})
export class AppComponent implements OnInit {
  userName$ = userName;
  isLoggedIn$ = isLoggedIn;

  ngOnInit(): void {}

  handleCreateEffect() {
    const loginDispose = loginUser2()();
  }

  handleChangeName(name: string): void {
    this.userName$.value = name;
  }

  handleLogClick() {}
}
