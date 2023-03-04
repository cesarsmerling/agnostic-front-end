import { LeptosTestComponent } from "./leptos/leptos-test.component";
import { Test2Component } from "./features/tests/test2.component";
import { Test1Component } from "./features/tests/test1.component";
import { EmployeePageComponent } from "./features/employees/employee-page.component";
import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { MerlinSignalsObjectsTestComponent } from "./leptos/objects/merlin-signals-objects-test.component";
import { ParentComponent } from "./leptos/effects/parent.component";
import { ParentContextComponent } from "./leptos/context-drilling/parent-context.component";
import { SiblingContextComponent } from "./leptos/context-drilling/sibling-context.component";
import { AsyncTestComponent } from "./leptos/asyncs/async-test.component";

@Component({
  selector: "app-root",
  standalone: true,
  template: `
    <h3>Angular with Signals</h3>
    <!-- <leptos-test></leptos-test> -->
    <!-- <app-merlin-signals-objects-test></app-merlin-signals-objects-test> -->
    <!-- <app-parent-test></app-parent-test> -->

    <!-- <app-async-test></app-async-test> -->

    <!-- <app-parent-context></app-parent-context> 
    <app-sibling-context></app-sibling-context> -->

    <app-async-test></app-async-test>

    <!-- <app-test1></app-test1> -->
    <!-- <app-test2></app-test2> -->
    <!-- <app-employee-page></app-employee-page> -->
  `,
  styles: [],
  providers: [],
  imports: [
    CommonModule,
    EmployeePageComponent,
    Test1Component,
    Test2Component,
    LeptosTestComponent,
    MerlinSignalsObjectsTestComponent,
    ParentComponent,
    ParentContextComponent,
    SiblingContextComponent,
    AsyncTestComponent,
  ],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class AppComponent implements OnInit {
  ngOnInit(): void {}
}
