import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-sibling-context",
  standalone: true,
  imports: [CommonModule],
  template: ` <h3>Sibling</h3>
    <b>
      I'm the sibling, I should not be afffected by context changes. Check the
      log
    </b>`,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SiblingContextComponent implements OnInit {
  //THIS FAILS BECAUSE ANOTHER COMPONENT IS CREATING THE CONTEXT
  // private cx = inject(TEST_TOKEN);

  constructor() {
    console.log("Sibling Constructor");
  }
  ngOnInit(): void {
    console.log("Sibling Constructor Init");
  }
}
