import { CommonModule } from "@angular/common";
import { render, screen, fireEvent } from "@testing-library/angular";
import { SelectComponent } from "./select.component";

describe("SelectComponent", () => {
  describe("as string data source and default template", () => {
    let component: any;
    let onChangeSpy = jest.fn();

    beforeEach(async () => {
      component = await render(SelectComponent<unknown>, {
        componentProperties: {
          dataSource: ["1", "2", "3"],
          value: "3",
          onChange: {
            emit: onChangeSpy,
          },
        } as any,
      });
    });

    it("should create one option for each item in data source input", () => {
      expect(screen.getByText("1")).toBeInTheDocument();
      expect(screen.getByText("2")).toBeInTheDocument();
      expect(screen.getByText("3")).toBeInTheDocument();
    });

    it("should select the value at init", () => {
      expect(screen.getByDisplayValue("3"));
    });

    it("should emit as output the selected value", () => {
      const select = screen.getByRole("combobox");
      //target.value is the index position.
      fireEvent.change(select, { target: { value: 0 } });
      expect(onChangeSpy).toHaveBeenCalledWith("1");
    });

    it("should select the value from the input on change from outside", () => {
      component.change({ value: "1" });
      expect(screen.getByDisplayValue("1"));
    });

    it("should change the options when data source input change", () => {
      component.change({ dataSource: ["1", "2", "3", "4", "5"] });
      expect(screen.getByText("1")).toBeInTheDocument();
      expect(screen.getByText("2")).toBeInTheDocument();
      expect(screen.getByText("3")).toBeInTheDocument();
      expect(screen.getByText("4")).toBeInTheDocument();
      expect(screen.getByText("5")).toBeInTheDocument();
    });
  });

  describe("as object data source and ng-template used", () => {
    const dataArray = [
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
    const data = JSON.stringify(dataArray).replaceAll('"', "'");
    const selected = JSON.stringify(dataArray[1]).replaceAll('"', "'");
    const template = (data: string, selected: string) =>
      `<app-select [dataSource]="${data}" [value]="${selected}"><ng-template #itemTemplate let-item> {{ item.local }} - {{item.name}}</ng-template></app-select>`;

    it("should render the component with object and using an ng-template", async () => {
      await render(template(data, selected), {
        imports: [CommonModule, SelectComponent],
      });
      expect(screen.getByText("local 1 - Pepe")).toBeInTheDocument();
      expect(screen.getByText("local 2 - Juan")).toBeInTheDocument();
      expect(screen.getByText("local 3 - Pablo")).toBeInTheDocument();
    });

    it("should select the option passed as value input as object ", async () => {
      await render(template(data, selected), {
        imports: [CommonModule, SelectComponent],
      });
      expect(screen.getByDisplayValue("local 2 - Juan"));
    });

    it("should select the frist option if value input is not in the data source ", async () => {
      const selectedNotInDataSource = JSON.stringify({
        local: "local 4",
        name: "Dario",
      }).replaceAll('"', "'");
      await render(template(data, selectedNotInDataSource), {
        imports: [CommonModule, SelectComponent],
      });
      expect(screen.getByDisplayValue("local 1 - Pepe"));
    });
  });
});
