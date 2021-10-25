import { fireEvent, render, screen } from "@testing-library/react";
import FilterDrawer from "./FilterDrawer";

describe("FilterDrawer", () => {
  it("should render props", () => {
    render(
      <FilterDrawer open onClose={() => {}}>
        test
      </FilterDrawer>
    );

    const drawer = screen.getByLabelText("Filter options");

    expect(drawer).toBeInTheDocument();
    expect(drawer).toHaveTextContent("test");
  });

  it("should render open", async () => {
    const onToggleMock = jest.fn();
    render(
      <FilterDrawer open onClose={onToggleMock}>
        test
      </FilterDrawer>
    );

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    expect(onToggleMock).toBeCalledTimes(1);
  });
});
