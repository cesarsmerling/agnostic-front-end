import { Component, Input, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-loaded-content",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div role="loading">{{ data.loading ? "Loading..." : "" }}</div>
    <div role="content" [ngClass]="{ disabled: data.loading }"></div>
  `,
  styles: [
    `
      .disabled {
        background-color: #ccc;
        opacity: 0.3;
        pointer-events: none;
      }
    `,
  ],
})
export class LoadedContentComponent<T, E> implements OnInit {
  @Input() data: { loading: boolean; data: T | null; error: E | null } = {
    loading: false,
    data: null,
    error: null,
  };

  constructor() {}

  ngOnInit(): void {}
}
