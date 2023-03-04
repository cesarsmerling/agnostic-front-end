import {
  Component,
  ContentChild,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  TemplateRef,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { AppUtils } from "./external";

@Component({
  selector: "app-select",
  standalone: true,
  imports: [CommonModule],
  template: `
    <select (change)="handleSelectChange($event)">
      <option
        *ngFor="let item of dataSource; let i = index"
        [value]="i"
        [selected]="i === selectedIndex"
      >
        <ng-container
          *ngIf="itemTemplate; else defaultItemTemplate"
          [ngTemplateOutlet]="itemTemplate"
          [ngTemplateOutletContext]="{ $implicit: item }"
        >
        </ng-container>
        <ng-template #defaultItemTemplate>
          {{ item }}
        </ng-template>
      </option>
    </select>
  `,
  styles: [],
})
export class SelectComponent<T> implements OnChanges {
  @ContentChild("itemTemplate") itemTemplate!: TemplateRef<T>;

  @Input() dataSource: T[] = [];
  @Input() value!: T;

  selectedIndex = 0;

  @Output() onChange = new EventEmitter<T>();

  ngOnChanges(changes: SimpleChanges) {
    if (changes["value"] && this.dataSource) {
      this.selectedIndex = this.dataSource.findIndex((item) =>
        AppUtils.isEqual(item, changes["value"].currentValue)
      );
    }
  }

  handleSelectChange(event: any) {
    const selectedIndex = event.target.value;
    const selected = this.dataSource[selectedIndex];
    this.onChange.emit(selected);
  }
}
