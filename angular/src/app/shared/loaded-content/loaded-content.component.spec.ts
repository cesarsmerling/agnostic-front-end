import {
  fireEvent,
  render,
  RenderComponentOptions,
  RenderResult,
  screen,
} from "@testing-library/angular";
import { LoadedContentComponent } from "./loaded-content.component";

describe("LoadedContentComponent", () => {
  let component: RenderResult<LoadedContentComponent<unknown, unknown>>;
  let initData = { loading: false, data: null, error: null };
  beforeEach(async () => {
    component = await render(LoadedContentComponent, {
      componentProperties: {
        data: initData,
      },
    });
  });

  it("should have a loading element", () => {
    expect(screen.getByRole("loading")).toBeInTheDocument();
  });

  //   it("should have a content element", () => {
  //     expect(screen.getByRole("content")).toBeInTheDocument();
  //   });

  it("should show spinner/Loading... when loading is true, hide when change to false", () => {
    component.change({ data: { ...initData, loading: true } });
    expect(screen.getByText("Loading...")).toBeInTheDocument();
    component.change({ data: { ...initData, loading: false } });
    expect(screen.queryByText("Loading...")).toBe(null);
  });

  it("should disabled the content when loading is true, and enabled when loading false", () => {
    const content = screen.getByRole("content");
    component.change({ data: { ...initData, loading: true } });
    expect(content).toHaveClass("disabled");
    fireEvent.click(content);
    component.change({ data: { ...initData, loading: false } });
    expect(content).not.toHaveClass("disabled");
  });
});
