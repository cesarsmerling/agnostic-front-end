import { UserContext } from "./app-contexts/user-context";
import { ArrayContext } from "./array-context";
import { Component, inject, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AsyncEffectsService } from "./async-effects.service";
import { UsersAsyncsService } from "./app-contexts/user-async";

@Component({
  selector: "app-async-test",
  standalone: true,
  imports: [CommonModule],
  template: `
    <h4>Async Effects</h4>

    <ng-container *ngIf="loading?.value; else user"> Loading.. </ng-container>

    <ng-template #user>
      <b>Current User:</b>
      <p>{{ currentUserS.value | json }}</p>
      <p>Success: {{ success.value.msg }}</p>
    </ng-template>

    <p *ngIf="error.value">Error: {{ error.value | json }}</p>

    <button (click)="handleReject()">Reject with USer 2</button>
    <button (click)="handleReject2()">Reject with USer 1</button>
    <button (click)="handleSwitch()">Switch</button>
    <button (click)="handleConcat()">Concat</button>
    <button (click)="handleMerge()">Merge</button>
  `,
  styles: [],
  providers: [
    AsyncEffectsService,
    ArrayContext.provider,
    UserContext.provider,
    UsersAsyncsService,
  ],
})
export class AsyncTestComponent implements OnInit {
  private asyncService = inject(UsersAsyncsService);

  private userCx = UserContext.cx;

  currentUserS = this.userCx.signal("currentUser");
  loading = this.asyncService.cx.signal("loading");
  error = this.asyncService.cx.signal("error");
  success = this.asyncService.cx.signal("success");

  constructor() {}

  ngOnInit(): void {
    this.asyncService.getUser2("user2");
  }

  handleReject() {
    this.asyncService.getUser2("user3");
  }

  handleReject2() {
    this.asyncService.getUser2("user1");
  }

  handleSwitch() {}

  handleConcat() {}

  handleMerge() {}
}
